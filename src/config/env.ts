import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
  EMAIL_PROVIDER: env.get("EMAIL_PROVIDER").required().asEnum(["nodemailer"]), // si en el futuro hay otros proveedores
  SMTP_HOST: env.get("SMTP_HOST").required().asString(),
  SMTP_PORT: env.get("SMTP_PORT").required().asPortNumber(),
  SMTP_USER: env.get("SMTP_USER").required().asString(),
  SMTP_PASSWORD: env.get("SMTP_PASSWORD").required().asString(),
  EMAIL_FROM_NAME: env.get("EMAIL_FROM_NAME").required().asString(),
  APP_URL: env.get("APP_URL").required().asUrlString(),
};
