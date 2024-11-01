import { Router } from "express";
import { searchCities } from "../controllers/cities.controller";

export const citiesRouter = Router();

citiesRouter.route("/searchCities").get(searchCities);
