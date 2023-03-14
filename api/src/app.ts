import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import facebookDataRoutes from "./routes/facebookData";
import env from "./utils/validateEnv";
import axios from "axios";
import TelegramData from "./models/telegramData";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/facebook-data", facebookDataRoutes);

// Define the webhook endpoint that Umnico will send data to
app.post("/umnico-webhook", async (req, res, next) => {
  try {
    if (req.body?.type != 'message.incoming') {
      return;
    }
    const socialId: string = req.body.message.sender.socialId;
    // TODO validate signature using secret key from Umnico API
    // Extract the relevant data from the webhook payload
    const leadId = req.body.leadId;
    const telegramId = socialId.replace('user_', '');
    if (!leadId || !telegramId) {
      console.log('Params does not exist');
      throw createHttpError(404, "Params does not exist");
    }
    console.log('leadId and telegramId there')

    // // Use the Telegram ID to locate the user's record in your CRM
    // // TODO fetch user record from your CRM
    const telegramData = await TelegramData.findOne({
      telegram_id: telegramId,
    }).exec();
    if (!telegramData) {
      console.log("User has not been found in database");
      throw createHttpError(404, "User has not been found in database");
    }

    // // // Update the user's record with the leadId data
    // // // TODO update user record in your CRM
    telegramData.umnico_lead_id = leadId;
    await telegramData.save();

    // Respond to the webhook with a 200 OK status code to acknowledge receipt
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

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
