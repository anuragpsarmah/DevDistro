import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getFeaturedReviews } from "../controllers/reviews.controller";

const limiter = rateLimit({
  windowMs: 1000,
  limit: 3,
});

export const reviewRouter = Router();

reviewRouter.route("/getFeaturedReviews").get(limiter, getFeaturedReviews);
