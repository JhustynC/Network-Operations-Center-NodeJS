// import "dotenv/config";
import * as env from "env-var";
import { config } from "dotenv";
import "dotenv/config";

export const envs = {
  //Server
  PROD: env.get("PROD").required().asBool(),
  PORT: env.get("PORT").required().asPortNumber(),

  //Mailer
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),

  //Mongo
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),
};

// export const getEnvs = (enviroment: string = "") => {
//   delete process.env.VARIABLE_TEST;
//   delete process.env.PORT;
//   delete process.env.MAILER_SERVICE;
//   delete process.env.MAILER_EMAIL;
//   delete process.env.MAILER_SECRET_KEY;
//   delete process.env.PROD;
//   delete process.env.MONGO_URL;
//   delete process.env.MONGO_DB_NAME;
//   delete process.env.MONGO_USER;
//   delete process.env.MONGO_PASS;
//   delete process.env.POSTGRES_URL;
//   delete process.env.POSTGRES_DB;
//   delete process.env.POSTGRES_USER;
//   delete process.env.POSTGRES_PASSWORD;

//   enviroment = enviroment.length > 0 ? `.env.${enviroment}` : ".env";

//   config({
//     path: enviroment,
//   });

//   const envs = {
//     PORT: env.get("PORT").required().asPortNumber(),
//     MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
//     MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
//     MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
//     PROD: env.get("PROD").required().asBool(),
//     MONGO_URL: env.get("MONGO_URL").required().asString(),
//     MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
//     MONGO_USER: env.get("MONGO_USER").required().asString(),
//     MONGO_PASS: env.get("MONGO_PASS").required().asString(),
//     POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
//   };

//   return envs;
// };
