import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import {
  getCommonSalesInformation,
  getSalesTransactions,
  getYearlySalesInformation,
} from "../controllers/sales.controller";
import { heavyReadLimiter } from "../utils/rateLimitConfig.util";

export const salesRouter = Router();

salesRouter
  .route("/getCommonSalesInformation")
  .get(heavyReadLimiter, sessionValidation, getCommonSalesInformation);
salesRouter
  .route("/getYearlySalesInformation")
  .get(heavyReadLimiter, sessionValidation, getYearlySalesInformation);
salesRouter
  .route("/getSalesTransactions")
  .get(heavyReadLimiter, sessionValidation, getSalesTransactions);
