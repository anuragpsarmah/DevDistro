import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import {
  getPrivateRepos,
  getPreSignedUrlForProjectMediaUpload,
} from "../controllers/projects.controller";

export const projectRouter = Router();

projectRouter.route("/getPrivateRepos").get(sessionValidation, getPrivateRepos);
projectRouter
  .route("/getPreSignedUrlForProjectMediaUpload")
  .post(sessionValidation, getPreSignedUrlForProjectMediaUpload);
