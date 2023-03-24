import "dotenv/config";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";
import { start } from "./commands/start";
import GeneralDataModel from "./models/generalData";
import TelegramDataModel from "./models/telegramData";
import env from "./utils/validateEnv";

// Connect to MongoDB database using Mongoose
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(async () => {
    console.log("Connected to MongoDB database");
    // Get token from database using Mongoose
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      console.log("General data has not been found");
      return;
    }

    let bot = new Telegraf(generalData.bot_token);

    bot.hears("left_chat_member", async (ctx) => {
      const telegramData = await TelegramDataModel.findOne({
        telegram_id: ctx.message.from.id,
      }).exec();

      if (!telegramData) {
        console.log("Telegram data has not been found");
        return;
      }

      telegramData.is_active = false;
      await telegramData.save();
    });

    bot.start((ctx) => start(ctx));

    // Start listening for Telegram updates
    bot.launch();

    GeneralDataModel.watch().on("change", async (change) => {
      if (change.operationType === "update") {
        bot.stop();

        const updatedToken = change.updateDescription?.updatedFields?.bot_token;
        bot = new Telegraf(updatedToken);

        bot.hears("left_chat_member", async (ctx) => {
          const telegramData = await TelegramDataModel.findOne({
            telegram_id: ctx.message.from.id,
          }).exec();

          if (!telegramData) {
            console.log("Telegram data has not been found");
            return;
          }

          telegramData.is_active = false;
          await telegramData.save();
        });

        bot.start((ctx) => start(ctx));

        // Start listening for Telegram updates
        bot.launch();
      }
    });
  })
  .catch((error) => console.error(error.message));
