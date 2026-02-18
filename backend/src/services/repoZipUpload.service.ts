import axios from "axios";
import { redisClient, s3Service } from "..";
import { githubAppService } from "./githubApp.service";
import { Project } from "../models/project.model";
import logger from "../logger/logger";
import { tryCatch } from "../utils/tryCatch.util";

const MAX_REPO_SIZE_BYTES = 500 * 1024 * 1024;
const LOCK_TTL_SECONDS = 600;

export default class RepoZipUploadService {
  private getLockKey(projectId: string): string {
    return `repo-zip-lock:${projectId}`;
  }

  async processRepoZipUpload(
    projectId: string,
    githubRepoId: string,
    installationId: number
  ): Promise<void> {
    const lockKey = this.getLockKey(projectId);

    const lockAcquired = await redisClient.set(
      lockKey,
      "1",
      "EX",
      LOCK_TTL_SECONDS,
      "NX"
    );

    if (!lockAcquired) {
      logger.info("Repo ZIP upload already in progress", { projectId });
      return;
    }

    try {
      const [project, findError] = await tryCatch(
        Project.findById(projectId).select("repo_zip_status").lean()
      );

      if (findError || !project) {
        logger.error("Failed to find project for ZIP upload", {
          projectId,
          error: findError instanceof Error ? findError.message : "Project not found",
        });
        await redisClient.del(lockKey);
        return;
      }

      if (project.repo_zip_status === "SUCCESS") {
        logger.info("Repo ZIP already uploaded", { projectId });
        await redisClient.del(lockKey);
        return;
      }

      const [installationToken, tokenError] = await tryCatch(
        githubAppService.getInstallationToken(installationId)
      );

      if (tokenError || !installationToken) {
        throw new Error(
          `Failed to get installation token: ${tokenError instanceof Error ? tokenError.message : "Unknown error"}`
        );
      }

      const [zipResponse, downloadError] = await tryCatch(
        axios.get(
          `https://api.github.com/repositories/${githubRepoId}/zipball`,
          {
            headers: {
              Authorization: `Bearer ${installationToken}`,
              Accept: "application/vnd.github+json",
            },
            responseType: "stream",
            maxContentLength: MAX_REPO_SIZE_BYTES,
            maxBodyLength: MAX_REPO_SIZE_BYTES,
          }
        )
      );

      if (downloadError || !zipResponse) {
        throw new Error(
          `Failed to download repo: ${downloadError instanceof Error ? downloadError.message : "Unknown error"}`
        );
      }

      const contentLength = parseInt(
        zipResponse.headers["content-length"] || "0",
        10
      );
      if (contentLength > MAX_REPO_SIZE_BYTES) {
        zipResponse.data.destroy();
        throw new Error(
          `Repository archive exceeds maximum size of ${MAX_REPO_SIZE_BYTES / (1024 * 1024)}MB`
        );
      }

      // Track streamed bytes to enforce size limit even without content-length
      let streamedBytes = 0;
      const sizeEnforcedStream = zipResponse.data;
      sizeEnforcedStream.on("data", (chunk: Buffer) => {
        streamedBytes += chunk.length;
        if (streamedBytes > MAX_REPO_SIZE_BYTES) {
          sizeEnforcedStream.destroy(
            new Error(
              `Repository archive exceeds maximum size of ${MAX_REPO_SIZE_BYTES / (1024 * 1024)}MB`
            )
          );
        }
      });

      const s3Key = `repoZips/${projectId}.zip`;

      const [, uploadError] = await tryCatch(
        s3Service.uploadStream(s3Key, sizeEnforcedStream, "application/zip")
      );

      if (uploadError) {
        throw new Error(
          `Failed to upload to S3: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`
        );
      }

      const [, updateError] = await tryCatch(
        Project.findByIdAndUpdate(projectId, {
          repo_zip_status: "SUCCESS",
          repo_zip_s3_key: s3Key,
          repo_zip_error: null,
        })
      );

      if (updateError) {
        logger.error("Failed to update project status after successful upload", {
          projectId,
          error: updateError instanceof Error ? updateError.message : "Unknown error",
        });
      }

      logger.info("Repo ZIP uploaded successfully", {
        projectId,
        s3Key,
        sizeBytes: streamedBytes,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      const [, updateError] = await tryCatch(
        Project.findByIdAndUpdate(projectId, {
          repo_zip_status: "FAILED",
          repo_zip_error: errorMessage,
        })
      );

      if (updateError) {
        logger.error("Failed to update project status after failed upload", {
          projectId,
        });
      }

      logger.error("Repo ZIP upload failed", {
        projectId,
        githubRepoId,
        error: errorMessage,
      });
    } finally {
      await redisClient.del(lockKey);
    }
  }
}
