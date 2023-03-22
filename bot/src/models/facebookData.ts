import { InferSchemaType, Schema, model } from "mongoose";

const facebookDataSchema = new Schema({
  click_id: {
    type: String,
    unique: true,
    required: true
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
    type: Date
  },
  umnico_lead_id: {
  },
});

export type FacebookData = InferSchemaType<typeof facebookDataSchema>;

export default model<FacebookData>("facebook_data_item", facebookDataSchema);
