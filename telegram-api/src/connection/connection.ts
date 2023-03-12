import mongoose from "mongoose";
import { bot } from "../app";
import env from "../utils/validateEnv";

export default () => {
  mongoose.connect(env.MONGO_CONNECTION_STRING);

  mongoose.connection.on("connected", async () => {
    console.log("Mongoose connected");
    await bot.launch();
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
