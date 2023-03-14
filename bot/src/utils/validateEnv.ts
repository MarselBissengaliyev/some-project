import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";
import { ValidateEnvInterface } from "./validateEnv.interface";

export default cleanEnv<ValidateEnvInterface>(process.env, {
  MONGO_CONNECTION_STRING: str(),
  TOKEN: str(),
  FACEBOOK_API_ACCESS_TOKEN: str(),
  PIXEL_ID: str()
});
