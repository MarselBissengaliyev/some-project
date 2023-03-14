import "dotenv/config";
import { Telegraf } from "telegraf";
import { start } from "./commands/start";
import connection from "./connection/connection";
import env from "./utils/validateEnv";

const token = env.TOKEN;
export const bot = new Telegraf(token);
bot.start((ctx) => {
  start(ctx);
});

connection();
