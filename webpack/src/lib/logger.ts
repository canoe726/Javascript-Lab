import { Express, NextFunction } from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";

export function logger(app?: Express) {
  if (!app) {
    return;
  }
  switch (process.env.SERVER_ENV) {
    case "development":
      app.use(morgan("dev"));
      break;
    case "production":
      const stream = fs.createWriteStream(path.join(__dirname, "/access.log"), {
        flags: "a",
      });
      app.use(morgan("combined", { stream }));
      break;
  }
}

export function timeLog(req: Request, res: Response, next: NextFunction): void {
  console.log(`Time:  ${Date.now()}`);
  next();
}
