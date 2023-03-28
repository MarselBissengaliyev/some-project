import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import facebookDataRoutes from "./routes/facebookData";
import generalDataRoutes from "./routes/generalData";
import imgRoutes from "./routes/img";
import pixelRoutes from "./routes/pixel";
import startMessageRoutes from "./routes/startMessage";
import telegramApiRoutes from "./routes/telegramApi";
import telegramDataRoutes from "./routes/telegramData";
import { umnikoWebhook } from "./webhooks/umnico";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

app.use(morgan("dev"));

const whitelist = [
  "https://front.roiup.team",
  "http://localhost:3000",
  "https://klensowter.click",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/api/facebook-data", facebookDataRoutes);

app.use("/api/pixels", pixelRoutes);

app.use("/api/telegram-data", telegramDataRoutes);

app.use("/api/general-data", generalDataRoutes);

app.use("/api/image", imgRoutes);

app.use("/api/start-message", startMessageRoutes);

app.use("/api/telegram-api", telegramApiRoutes);

/**
 * Define the webhook endpoint that Umnico will send data to
 */
app.post("/umnico-webhook", umnikoWebhook);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unkown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  if (error instanceof multer.MulterError) {
    errorMessage = error.message;
    statusCode = 400;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
