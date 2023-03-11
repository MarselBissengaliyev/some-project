import cors from "cors";
import 'dotenv/config';
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import facebookDataRoutes from "./routes/facebookData";
import env from "./utils/validateEnv";


const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/facebook-data", facebookDataRoutes);

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
  res.status(statusCode).json({ error: errorMessage });
});


export default app;
