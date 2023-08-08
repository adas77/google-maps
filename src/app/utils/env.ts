import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  API_KEY: str(),
});

export default env;
