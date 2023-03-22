import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  facebook_data_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  telegram_data_id: {
    type: Schema.Types.ObjectId,
  },
  time_sale: Number,
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
