import { Request, Response } from "express";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.util";
import ApiError from "../utils/ApiError.util";
import response from "../utils/response.util";
import { User } from "../models/user.model";
import logger from "../logger/logger";
import { tryCatch } from "../utils/tryCatch.util";
import { enrichContext } from "../utils/asyncContext";

const WISHLIST_PROJECT_SELECT =
  "title description project_type tech_stack price avgRating totalReviews live_link createdAt project_images";

const WISHLIST_SELLER_POPULATE = {
  path: "userid",
  select: "username name profile_image_url -_id",
};

const toggleWishlist = asyncHandler(async (req: Request, res: Response) => {
  enrichContext({ action: "toggle_wishlist" });

  if (!req.user) {
    enrichContext({ outcome: "unauthorized" });
    throw new ApiError("Error during validation", 401);
  }

  const { project_id } = req.body;

  if (
    !project_id ||
    typeof project_id !== "string" ||
    !mongoose.Types.ObjectId.isValid(project_id)
  ) {
    enrichContext({
      outcome: "validation_failed",
      reason: "invalid_project_id",
    });
    response(res, 400, "Valid project_id is required");
    return;
  }

  const userId = new mongoose.Types.ObjectId(req.user._id);
  const projectObjectId = new mongoose.Types.ObjectId(project_id);

  enrichContext({ entity: { type: "wishlist", id: userId.toString() } });

  const [userData, userError] = await tryCatch(
    User.findById(userId).select("wishlist").lean()
  );

  if (userError || !userData) {
    enrichContext({ outcome: "error", error: { name: "DatabaseError" } });
    logger.error("Failed to fetch user wishlist", userError);
    response(res, 500, "Failed to update wishlist. Try again later.");
    return;
  }

  const wishlistIds = (userData.wishlist as mongoose.Types.ObjectId[]) ?? [];
  const isCurrentlyWishlisted = wishlistIds.some((id) =>
    id.equals(projectObjectId)
  );

  const updateOp = isCurrentlyWishlisted
    ? { $pull: { wishlist: projectObjectId } }
    : { $addToSet: { wishlist: projectObjectId } };

  const [, updateError] = await tryCatch(
    User.updateOne({ _id: userId }, updateOp)
  );

  if (updateError) {
    enrichContext({ outcome: "error", error: { name: "DatabaseError" } });
    logger.error("Failed to update wishlist", updateError);
    response(res, 500, "Failed to update wishlist. Try again later.");
    return;
  }

  const isWishlisted = !isCurrentlyWishlisted;
  enrichContext({ outcome: "success", is_wishlisted: isWishlisted });
  response(
    res,
    200,
    isWishlisted ? "Added to wishlist" : "Removed from wishlist",
    {
      isWishlisted,
    }
  );
});

const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  enrichContext({ action: "get_wishlist" });

  if (!req.user) {
    enrichContext({ outcome: "unauthorized" });
    throw new ApiError("Error during validation", 401);
  }

  const userId = new mongoose.Types.ObjectId(req.user._id);
  enrichContext({ entity: { type: "wishlist", id: userId.toString() } });

  const [userData, userError] = await tryCatch(
    User.findById(userId)
      .select("wishlist")
      .populate({
        path: "wishlist",
        select: WISHLIST_PROJECT_SELECT,
        populate: WISHLIST_SELLER_POPULATE,
        match: {
          isActive: true,
          github_access_revoked: false,
          repo_zip_status: "SUCCESS",
        },
      })
      .lean()
  );

  if (userError || !userData) {
    enrichContext({ outcome: "error", error: { name: "DatabaseError" } });
    logger.error("Failed to fetch wishlist", userError);
    response(res, 500, "Failed to fetch wishlist. Try again later.");
    return;
  }

  const wishlistItems = (userData.wishlist as any[]) ?? [];

  const projects = wishlistItems.filter(Boolean).map((p: any) => ({
    ...p,
    project_images: p.project_images?.[0] ?? "",
  }));

  enrichContext({ outcome: "success", wishlist_count: projects.length });
  response(res, 200, "Wishlist fetched successfully", { projects });
});

export { toggleWishlist, getWishlist };
