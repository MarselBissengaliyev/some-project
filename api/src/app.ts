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
import telegramDataRoutes from "./routes/telegramData";
import env from "./utils/validateEnv";
import { umnikoWebhook } from "./webhooks/umnico";

const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

app.use(morgan("dev"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/facebook-data", facebookDataRoutes);

app.use("/api/pixels", pixelRoutes);

app.use("/api/telegram-data", telegramDataRoutes);

app.use("/api/general-data", generalDataRoutes);

app.use("/api/image", imgRoutes);

app.use("/api/start-message", startMessageRoutes);

/**
 * Define the webhook endpoint that Umnico will send data to
 */
app.post("/umnico-webhook", umnikoWebhook);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unkown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  if (error instanceof multer.MulterError) {
    errorMessage = error.message;
    statusCode = 400;
    
    if (error.code === 'LIMIT_FIELD_COUNT') {
      errorMessage = 'LIMIT_FIELD_COUNT';
    }
    if (error.code === 'LIMIT_FIELD_KEY') {
      errorMessage = 'LIMIT_FIELD_KEY';
    }
    if (error.code === 'LIMIT_FIELD_VALUE') {
      errorMessage = 'LIMIT_FIELD_VALUE';
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      errorMessage = 'LIMIT_FILE_COUNT';
    }
    if (error.code === 'LIMIT_FILE_SIZE') {
      errorMessage = 'LIMIT_FILE_SIZE';
    }
    if (error.code === 'LIMIT_PART_COUNT') {
      errorMessage = 'LIMIT_PART_COUNT';
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      errorMessage = 'LIMIT_UNEXPECTED_FILE';
    }
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
