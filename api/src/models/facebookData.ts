import { InferSchemaType, Schema, model } from "mongoose";

const facebookDataSchema = new Schema({
  click_id: {
    type: String,
    required: true,
    unique: true,
  },
  ip: {
    type: String,
  },
  user_agent: {
    type: String,
  },
  pixel: {
    type: String,
  },
  fb_click: {
    type: String,
  },
  domain: {
    type: String,
  },
  time_click: {
    type: Number
  },
});

export type FacebookData = InferSchemaType<typeof facebookDataSchema>;

export default model<FacebookData>("facebook_data_item", facebookDataSchema);
