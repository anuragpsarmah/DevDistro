import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { SiteReview } from "../models/siteReview.model";
import response from "../utils/response.util";
import ApiError from "../utils/ApiError.util";

const getFeaturedReviews = asyncHandler(async (req: Request, res: Response) => {
  try {
    const featuredReviews = await SiteReview.find()
      .sort({
        review_stars: -1,
        createdAt: -1,
      })
      .limit(3);

    response(
      res,
      200,
      "Featured reviews fetched successfully",
      featuredReviews
    );
  } catch (error) {
    throw new ApiError("Something went wrong", 500);
  }
});

export { getFeaturedReviews };
