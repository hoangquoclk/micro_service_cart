import { config } from 'dotenv';
config();

// DATABASE
export const USERS_TABLE_NAME = 'users';

export const SEQUELIZE = 'SEQUELIZE';

// REPOSITORIES
export const USER_REPOSITORY = 'USER_REPOSITORY';

export const USER_TOKEN_REPOSITORY = 'USER_TOKEN_REPOSITORY';

// JWT
export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
export const JWT_EXPIRES_IN_TOKEN = process.env.JWT_EXPIRES_IN_TOKEN;

export const JWT_EXPIRES_IN_REFRESH_TOKEN =
  process.env.JWT_EXPIRES_IN_REFRESH_TOKEN;
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN;
