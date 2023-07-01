import { config } from 'dotenv';
config();

// JWT
export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
export const JWT_EXPIRES_IN_TOKEN = process.env.JWT_EXPIRES_IN_TOKEN;

// KAFKA
export const KAFKA_PRODUCT_CREATED_TOPIC =
  process.env.KAFKA_PRODUCT_CREATED_TOPIC;
