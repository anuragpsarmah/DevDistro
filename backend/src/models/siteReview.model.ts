import { model, Schema } from "mongoose";

const siteReviewSchema = new Schema({
  review_description: {
    type: String,
    default: "",
  },
  review_stars: {
    type: Number,
    default: -1,
  },
});

export const SiteReview = model("SiteReview", siteReviewSchema);
