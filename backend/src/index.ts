import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./initializations/db-connect";
import { app } from "./app";
import logger from "./logger/logger";
import { redisInitialization } from "./initializations/redis-initialization";
import { Redis } from "ioredis";
import S3Service from "./services/S3.service";
import RepoZipUploadService from "./services/repoZipUpload.service";
import S3CleanupService from "./workers/S3Cleanup.worker";
import { startScheduledDeletionJob } from "./utils/projectCleanup.util";



const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const DBretiers = process.env.RETRIES ? Number(process.env.RETRIES) : 3;

export let redisClient: Redis;
export let s3Service: S3Service;
export let repoZipUploadService: RepoZipUploadService;

(async () => {
  try {
    redisClient = await redisInitialization();
  } catch (error) {
    process.exit(1);
  }

  let retries = DBretiers;
  while (retries--) {
    try {
      await dbConnect();
      break;
    } catch (error) {
      logger.error("Error connecting to DB", error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!retries) process.exit(1);
    }
  }

  s3Service = new S3Service();
  repoZipUploadService = new RepoZipUploadService();

  startScheduledDeletionJob();

  S3CleanupService.startWorker().catch((err) => {
    logger.error("Failed to start cleanup worker:", err);
    process.exit(1);
  });

  app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}`));
})();
