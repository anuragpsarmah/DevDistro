import { model, Schema } from "mongoose";
import { User } from "./user.model";
import { Project } from "./project.model";

const reviewSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: Project,
      required: [true, "Project ID is required"],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: [true, "User ID is required"],
      index: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ projectId: 1, rating: -1 });
reviewSchema.index({ userId: 1, projectId: 1 }, { unique: true });

export const Review = model("Review", reviewSchema);
