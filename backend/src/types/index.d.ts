import * as express from "express";
import { UserType } from "./types";

declare global {
  namespace Express {
    export interface Request {
      user?: UserType;
      rateLimited?: boolean;
      rateLimitMessage?: string;
    }
  }
}
