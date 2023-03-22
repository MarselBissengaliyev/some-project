import "dotenv/config";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";
import { start } from "./commands/start";
import GeneralDataModel, { GeneralData } from "./models/generalData";
import env from "./utils/validateEnv";
import TelegramDataModel from "./models/telegramData";

// Connect to MongoDB database using Mongoose
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB database");

    // Get token from database using Mongoose
    GeneralDataModel.findOne({}, (err: any, data: GeneralData) => {
      if (err) {
        console.log("suka");
        console.error(err);
      } else {
        // Launch Telegraf with token from database
        const bot = new Telegraf(data.bot_token);

        bot.hears('left_chat_member', async (ctx) => {
          const telegramData = await TelegramDataModel.findOne({ telegram_id: ctx.message.from.id }).exec();

          if (!telegramData) {
            console.log('Telegram data has not been found')
            return;
          }

          telegramData.is_activ = false;
          await telegramData.save();
        });

        bot.start((ctx) => start(ctx));

        // Start listening for Telegram updates
        bot.launch();
      }
    });
  })
  .catch((error) => console.error(error.message));
