import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import {
  getProfileInformation,
  getWalletAddress,
  updateProfileInformation,
  updateWalletAddress,
} from "../controllers/profile.controller";
import {
  toggleWalletConnectionLimiter,
  updateProfileLimiter,
  generalAuthReadLimiter,
} from "../utils/rateLimitConfig.util";

export const profileRouter = Router();

profileRouter
  .route("/getProfileInformation")
  .get(generalAuthReadLimiter, sessionValidation, getProfileInformation);
profileRouter
  .route("/updateProfileInformation")
  .put(updateProfileLimiter, sessionValidation, updateProfileInformation);
profileRouter
  .route("/getWalletAddress")
  .get(generalAuthReadLimiter, sessionValidation, getWalletAddress);
profileRouter
  .route("/updateWalletAddress")
  .put(toggleWalletConnectionLimiter, sessionValidation, updateWalletAddress);
