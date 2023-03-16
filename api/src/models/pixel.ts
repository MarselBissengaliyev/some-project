import { InferSchemaType, Schema, model } from "mongoose";

export const pixelSchema = new Schema({
  fb_pixel_id: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true
  }
});

type Pixel = InferSchemaType<typeof pixelSchema>;

export default model<Pixel>("pixel", pixelSchema);
