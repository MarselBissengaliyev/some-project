import { InferSchemaType, Schema, model } from "mongoose";

export const generalDataSchema = new Schema({
  bot_start_message: {
    type: String,
    required: true,
  },
  bot_token: {
    type: String,
    required: true
  },
});

type GeneralData = InferSchemaType<typeof generalDataSchema>;

export default model<GeneralData>("general_data_item", generalDataSchema);
