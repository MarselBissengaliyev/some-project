import "dotenv/config";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";
import { start } from "./commands/start";
import GeneralDataModel from "./models/generalData";
import env from "./utils/validateEnv";

// Connect to MongoDB database using Mongoose
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(async () => {
    // Get token from database using Mongoose
    const generalData = await GeneralDataModel.findOne({}).exec();

    if (!generalData) {
      return;
    }

    let bot = new Telegraf(generalData.bot_token);

    bot.start(async (ctx) => await start(ctx));

    // Start listening for Telegram updates
    await bot.launch();

    GeneralDataModel.watch().on("change", async (change) => {
      if (change.operationType === "update") {
        bot.stop();

        const updatedToken = change.updateDescription?.updatedFields?.bot_token;
        bot = new Telegraf(updatedToken);

        bot.start(async (ctx) =>  await start(ctx));

        // Start listening for Telegram updates
        await bot.launch();
      }
    });
  })
  .catch((error) => console.error(error.message));
