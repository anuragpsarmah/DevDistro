import { Router } from "express";
import { handleWebhook } from "../controllers/webhook.controller";
import { webhookLimiter } from "../utils/rateLimitConfig.util";

export const webhookRouter = Router();

webhookRouter.route("/github").post(webhookLimiter, handleWebhook);
