import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import {
  getProfileInformation,
  updateProfileInformation,
} from "../controllers/profile.controller";
import { getProfileInformationFromCache } from "../cache/profile.cache";

export const profileRouter = Router();

profileRouter
  .route("/getProfileInformation")
  .get(
    sessionValidation,
    getProfileInformationFromCache,
    getProfileInformation
  );
profileRouter
  .route("/updateProfileInformation")
  .put(sessionValidation, updateProfileInformation);
