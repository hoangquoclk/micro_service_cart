import { config } from 'dotenv';
config();

export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

export const JWT_EXPIRES_IN_TOKEN = process.env.JWT_EXPIRES_IN_TOKEN;
