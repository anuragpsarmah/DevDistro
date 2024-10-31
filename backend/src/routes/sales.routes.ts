import { Router } from "express";
import { sessionValidation } from "../middlewares/sessionValidation.middlewares";
import {
  getCommonSalesInformation,
  getYearlySalesInformation,
} from "../controllers/sales.controller";

export const salesRouter = Router();

salesRouter
  .route("/getCommonSalesInformation")
  .get(sessionValidation, getCommonSalesInformation);
salesRouter
  .route("/getYearlySalesInformation")
  .get(sessionValidation, getYearlySalesInformation);
