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
import env from "./utils/validateEnv";
import { umnikoWebhook } from "./webhooks/umnico";

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', env.CLIENT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

// app.use(
//   cors({
//     origin: env.CLIENT_URL ?? '*',  
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );

app.use(morgan("dev"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

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

    if (error.code === "LIMIT_FIELD_COUNT") {
      errorMessage = "LIMIT_FIELD_COUNT";
    }
    if (error.code === "LIMIT_FIELD_KEY") {
      errorMessage = "LIMIT_FIELD_KEY";
    }
    if (error.code === "LIMIT_FIELD_VALUE") {
      errorMessage = "LIMIT_FIELD_VALUE";
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      errorMessage = "LIMIT_FILE_COUNT";
    }
    if (error.code === "LIMIT_FILE_SIZE") {
      errorMessage = "LIMIT_FILE_SIZE";
    }
    if (error.code === "LIMIT_PART_COUNT") {
      errorMessage = "LIMIT_PART_COUNT";
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      errorMessage = "LIMIT_UNEXPECTED_FILE";
    }
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
