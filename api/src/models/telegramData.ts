import { InferSchemaType, Schema, model } from "mongoose";

const telegramDataSchema = new Schema({
  telegram_id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name_telegram: {
    type: String,
    required: true,
  },
  login_telegram: {
    type: String,
    required: true,
  },
  is_activ: {
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
    type: Date,
    required: true,
  },
  umnico_lead_id: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  time_sale: {
    type: Date,
  },
  start_time: {
    type: Date
  }
});

export type TelegramData = InferSchemaType<typeof telegramDataSchema>;

export default model<TelegramData>("telegram_data_item", telegramDataSchema);
