import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";
import { ValidateEnvInterface } from "./validateEnv.interface";

export default cleanEnv<ValidateEnvInterface>(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  UMNICO_API_TOKEN: str(),
  CLIENT_URL: str(),
  API_TELEGRAM: str()
});
