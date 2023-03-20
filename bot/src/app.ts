import "dotenv/config";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";
import { start } from "./commands/start";
import GeneralDataModel, { GeneralData } from "./models/generalData";
import env from "./utils/validateEnv";

// Connect to MongoDB database using Mongoose
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB database");

    // Get token from database using Mongoose
    GeneralDataModel.findOne({}, (err: any, data: GeneralData) => {
      if (err) {
        console.log('suka')
        console.error(err);
      } else {
        // Launch Telegraf with token from database
        const bot = new Telegraf(data.bot_token);
        
        bot.start((ctx) => start(ctx));

        // Start listening for Telegram updates
        bot.launch();
      }
    });
  })
  .catch((error) => console.error(error.message));
