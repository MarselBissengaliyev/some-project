import { InferSchemaType, Schema, model } from "mongoose";

const telegramDataSchema = new Schema({
  telegram_id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name_telegram: {
    type: String
  },
  login_telegram: {
    type: String
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  telegram_bot_login: {
    type: String,
    required: true,
  },
  is_deposit: {
    type: Boolean,
    required: true,
  },
  time_lead: {
    type: Number,
  },
  umnico_lead_id: {
    type: Number,
  },
  amount: {
    type: Number,
    default: 0,
  },
  time_sale: {
    type: Number,
  },
  click_id: {
    type: String
  },
  last_name_telegram: {
    type: String,
  },
});

export type TelegramData = InferSchemaType<typeof telegramDataSchema>;

export default model<TelegramData>("telegram_data_item", telegramDataSchema);
