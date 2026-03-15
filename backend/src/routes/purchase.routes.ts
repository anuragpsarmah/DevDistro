import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import {
  initiatePurchaseLimiter,
  confirmPurchaseLimiter,
  downloadLimiter,
  receiptLimiter,
  heavyReadLimiter,
} from "../utils/rateLimitConfig.util";
import {
  initiatePurchase,
  confirmPurchase,
  getPurchasedProjects,
  downloadProject,
  downloadReceipt,
} from "../controllers/purchase.controller";

export const purchaseRouter = Router();

purchaseRouter
  .route("/initiate")
  .post(initiatePurchaseLimiter, sessionValidation, initiatePurchase);

purchaseRouter
  .route("/confirm")
  .post(confirmPurchaseLimiter, sessionValidation, confirmPurchase);

purchaseRouter
  .route("/getPurchasedProjects")
  .get(heavyReadLimiter, sessionValidation, getPurchasedProjects);

purchaseRouter
  .route("/download")
  .get(downloadLimiter, sessionValidation, downloadProject);

purchaseRouter
  .route("/receipt")
  .get(receiptLimiter, sessionValidation, downloadReceipt);
