import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import { getPrivateRepos } from "../controllers/projects.controller";

export const projectRouter = Router();

projectRouter.route("/getPrivateRepos").get(sessionValidation, getPrivateRepos);
