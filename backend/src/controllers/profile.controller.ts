import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import ApiError from "../utils/ApiError.util";
import { User } from "../models/user.model";
import response from "../utils/response.util";

const getProfileInformation = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.user) {
      try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
          response(
            res,
            401,
            "User not found in token payload. Log out the user"
          );
          return;
        }

        response(res, 200, "User info fetched successfully", {
          username: req.user.username,
          name: req.user.name,
          profileImageUrl: req.user.profileImageUrl,
          jobRole: user.job_role,
          location: user.location,
          reviewDescription: user.review_description,
          reviewStar: user.review_stars,
          profileVisibility: user.profile_visibility,
        });
      } catch (error) {
        throw new ApiError("Internal Server Error", 500, {}, error);
      }
    } else {
      throw new ApiError("Error during validation", 401);
    }
  }
);

const updateProfileInformation = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.user) {
      const {
        job_role,
        review_description,
        review_stars,
        location,
        profile_visibility,
      } = req.body;

      try {
        const user = await User.findOne({ username: req.user.username });

        if (!user) {
          response(
            res,
            401,
            "User not found in token payload. Log out the user"
          );
          return;
        }

        user.job_role = job_role;
        user.review_description = review_description;
        user.review_stars = review_stars;
        user.location = location;
        user.profile_visibility = profile_visibility;
        await user.save();

        response(res, 200, "User profile information updated successfully");
      } catch (error) {
        throw new ApiError("Internal Server Error", 500, {}, error);
      }
    } else {
      throw new ApiError("Error during validation", 401);
    }
  }
);

export { getProfileInformation, updateProfileInformation };
