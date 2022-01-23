import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const { LOGGING_LEVEL } = process.env;
export const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRESS_DB, DB_PORT, BCRYPT_SALT } = process.env;
// export const DB_PORT = process.env.DB_PORT ? process.env.DB_PORT : '5432';