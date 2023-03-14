import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";
import { ValidateEnvInterface } from "./validateEnv.interface";

export default cleanEnv<ValidateEnvInterface>(process.env, {
  MONGO_CONNECTION_STRING: str(),
  TOKEN: str(),
});
