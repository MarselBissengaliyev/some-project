import { InferSchemaType, Schema, model } from "mongoose";

const telegramDataSchema = new Schema({
  telegram_id: String,
  first_name_telegram: String,
  login_telegram: String,
  is_activ: String,
  telegram_bot_login: String,
  is_deposit: String,
  time_lead: Date,
});

type TelegramData = InferSchemaType<typeof telegramDataSchema>;

export default model<TelegramData>("TelegramData", telegramDataSchema);
