import { Router } from "express";
import { handleWebhook } from "../controllers/webhook.controller";

export const webhookRouter = Router();

webhookRouter.route("/github").post(handleWebhook);
