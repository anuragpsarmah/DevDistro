import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import { toggleWishlist, getWishlist } from "../controllers/wishlist.controller";

export const wishlistRouter = Router();

wishlistRouter.route("/toggle").post(sessionValidation, toggleWishlist);
wishlistRouter.route("/getWishlist").get(sessionValidation, getWishlist);
