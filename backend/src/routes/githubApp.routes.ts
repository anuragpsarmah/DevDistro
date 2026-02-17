import { Router } from "express";
import {
  checkInstallationStatus,
  handleAppInstallCallback
} from "../controllers/githubApp.controller";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";

export const githubAppRouter = Router();

githubAppRouter.route("/status").get(sessionValidation, checkInstallationStatus);
githubAppRouter.route("/callback").get(sessionValidation, handleAppInstallCallback);
