import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { privateRepoPrefix } from "../utils/redisPrefixGenerator.util";
import { redisClient } from "..";
import response from "../utils/response.util";
import logger from "../logger/logger";
import ApiError from "../utils/ApiError.util";

const getPrivateReposFromCache = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const redisKey = privateRepoPrefix(req.user._id);

      try {
        const cached_private_repositories = await redisClient.get(redisKey);

        if (cached_private_repositories) {
          const cachedData = JSON.parse(cached_private_repositories);

          if (req.rateLimited) {
            response(
              res,
              200,
              req.rateLimitMessage || "Too many requests. Cached data fetched.",
              [...cachedData, { isRateLimited: true }]
            );
            return;
          }

          if (req.query.refreshStatus === "false") {
            response(
              res,
              200,
              "Repos fetched from cache successfully",
              cachedData
            );
            return;
          }

          next();
        } else {
          if (req.rateLimited) {
            response(
              res,
              429,
              "Too many refresh requests and no cached data available",
              null
            );
            return;
          }

          next();
        }
      } catch (error) {
        logger.error("Redis error:", error);

        if (req.rateLimited) {
          response(res, 429, "Too many requests and cache unavailable", null);
          return;
        }

        next();
      }
    } else {
      throw new ApiError("Error during validation", 401);
    }
  }
);

export { getPrivateReposFromCache };
