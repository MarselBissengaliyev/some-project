import { InferSchemaType, Schema, model } from "mongoose";

const telegramDataSchema = new Schema({
  telegram_id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name_telegram: {
    type: String,
  },
  login_telegram: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
  telegram_bot_login: {
    type: String,
  },
  is_deposit: {
    type: Boolean,
  },
  time_lead: {
    type: Number,
  },
  umnico_lead_id: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  time_sale: {
    type: Number,
  },
  click_id: {
    type: String,
  },
  last_name_telegram: {
    type: String,
  },
});

export type TelegramData = InferSchemaType<typeof telegramDataSchema>;

export default model<TelegramData>("telegram_data_item", telegramDataSchema);
