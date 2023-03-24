import { InferSchemaType, Schema, model } from "mongoose";

export const generalDataSchema = new Schema({
  bot_token: {
    type: String,
    required: true,
  },
  bot_avatar: {
    type: String,
  },
});

type GeneralData = InferSchemaType<typeof generalDataSchema>;

export default model<GeneralData>("general_data_item", generalDataSchema);
