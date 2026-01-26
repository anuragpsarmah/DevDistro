import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { SiteReview } from "../models/siteReview.model";
import response from "../utils/response.util";
import ApiError from "../utils/ApiError.util";
import mongoose from "mongoose";
import logger from "../logger/logger";
import { tryCatch } from "../utils/tryCatch.util";
import { enrichContext } from "../utils/asyncContext";

const getFeaturedReviews = asyncHandler(async (req: Request, res: Response) => {
  enrichContext({ action: "get_featured_reviews" });

  const { FEATURED_REVIEW_ID1, FEATURED_REVIEW_ID2, FEATURED_REVIEW_ID3 } =
    process.env;

  if (!FEATURED_REVIEW_ID1 || !FEATURED_REVIEW_ID2 || !FEATURED_REVIEW_ID3) {
    enrichContext({ outcome: "not_found", reason: "missing_env_config" });
    response(res, 404, "No featured reviews found");
    return;
  }

  const id1 = new mongoose.Types.ObjectId(FEATURED_REVIEW_ID1);
  const id2 = new mongoose.Types.ObjectId(FEATURED_REVIEW_ID2);
  const id3 = new mongoose.Types.ObjectId(FEATURED_REVIEW_ID3);

  enrichContext({
    entity: { type: "reviews", ids: [id1.toString(), id2.toString(), id3.toString()] }
  });

  const dbStartTime = performance.now();
  const [featuredReviews, error] = await tryCatch(
    SiteReview.find({
      _id: { $in: [id1, id2, id3] },
    })
  );
  enrichContext({ db_latency_ms: Math.round(performance.now() - dbStartTime) });

  if (error) {
    enrichContext({
      outcome: "error",
      error: { name: "DatabaseError", message: error instanceof Error ? error.message : "Database query failed" },
    });
    logger.error("Failed to fetch featured reviews", error);
    throw new ApiError("Something went wrong", 500);
  }

  enrichContext({
    outcome: "success",
    results_count: featuredReviews?.length || 0,
  });

  response(res, 200, "Featured reviews fetched successfully", featuredReviews);
});

export { getFeaturedReviews };

