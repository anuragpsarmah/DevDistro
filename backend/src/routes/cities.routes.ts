import { Router } from "express";
import { searchCities } from "../controllers/cities.controller";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000,
  limit: 5,
});

export const citiesRouter = Router();

citiesRouter.route("/searchCities").get(limiter, searchCities);
