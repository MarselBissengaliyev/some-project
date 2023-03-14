import { InferSchemaType, Schema, model } from "mongoose";

const facebookDataSchema = new Schema({
  click_id: {
    type: String,
    required: true,
    unique: true,
  },
  ip: {
    type: String,
    required: true,
  },
  user_agent: {
    type: String,
    required: true,
  },
  pixel: {
    type: String,
    required: true,
  },
  fb_click: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  time_click: {
    type: Date,
    default: Date.now(),
  },
  umnico_lead_id: {
    type: String,
  },
});

export type FacebookData = InferSchemaType<typeof facebookDataSchema>;

export default model<FacebookData>("facebook_data_item", facebookDataSchema);
