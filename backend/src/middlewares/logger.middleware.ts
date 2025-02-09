import { NextFunction, Request, Response } from "express";
import logger from "../logger/logger";
import * as UAParser from "ua-parser-js";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = performance.now();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  const parser = new UAParser.UAParser(req.headers["user-agent"]);
  const userAgent = parser.getResult();
  const deviceInfo = {
    browser: `${userAgent.browser.name || "Unknown"}/${userAgent.browser.version || "?"}`,
    os: `${userAgent.os.name || "Unknown"}/${userAgent.os.version || "?"}`,
    device: userAgent.device.type || "Unknown",
  };

  res.on("finish", () => {
    const endTime = performance.now();
    logger.http(
      `${ip} ${method} ${url} ${res.statusCode} ${(endTime - startTime).toFixed(2)}ms | ` +
        `Device: ${deviceInfo.device} | Browser: ${deviceInfo.browser} | OS: ${deviceInfo.os}`
    );
  });
  next();
};

export default loggerMiddleware;
