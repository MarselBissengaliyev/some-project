import { InferSchemaType, Schema, model } from "mongoose";

export const startMessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  disable_web_page_preview: {
    type: Boolean,
    default: true,
  },
});

export type StartMessage = InferSchemaType<typeof startMessageSchema>;

export default model<StartMessage>("start_message", startMessageSchema);
