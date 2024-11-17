import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { profileInformationPrefix } from "../utils/redisPrefixGenerator.util";
import { redisClient } from "..";
import response from "../utils/response.util";
import logger from "../logger/winston.logger";
import ApiError from "../utils/ApiError.util";

const getProfileInformationFromCache = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const redisKey = profileInformationPrefix(req.user._id);
      try {
        const cached_profile_information = await redisClient.get(redisKey);
        if (cached_profile_information) {
          response(
            res,
            200,
            "Profile information fetched from cache successfully",
            JSON.parse(cached_profile_information)
          );
          return;
        }
      } catch (error) {
        logger.error("Redis error:", error);
      }

      next();
    } else {
      throw new ApiError("Error during validation", 401);
    }
  }
);

export { getProfileInformationFromCache };
