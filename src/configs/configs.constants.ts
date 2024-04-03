import { config } from 'dotenv';

config();

export const JwtConfig = {
  COMMON_API_JWT_SECRET: process.env.COMMON_API_JWT_SECRET,
  COMMON_API_JWT_EXPIRES_IN: process.env.COMMON_API_JWT_EXPIRES_IN,
  COMMON_API_JWT_REFRESH_TOKEN_SECRET:
    process.env.COMMON_API_JWT_REFRESH_TOKEN_SECRET,
  COMMON_API_JWT_REFRESH_TOKEN_EXPIRES_IN:
    process.env.COMMON_API_JWT_REFRESH_TOKEN_EXPIRES_IN,
};

export const CommonConfig = {
  COMMON_API_WEB_BASE_URL: process.env.COMMON_API_WEB_BASE_URL,
  COMMON_API_TTL: +process.env.COMMON_API_TTL || 300,
  COMMON_API_LIMIT: +process.env.COMMON_API_LIMIT || 1000,
};

export const redisConfig = {
  COMMON_API_REDIS_URI: process.env.COMMON_API_REDIS_URI,
};

export const azureConfig = {
  AZURE_ACCOUNT_NAME: process.env.AZURE_ACCOUNT_NAME,
  AZURE_ACCOUNT_KEY: process.env.AZURE_ACCOUNT_KEY,
  AZURE_CONTAINER_NAME: process.env.AZURE_CONTAINER_NAME,
  AZURE_EXPIRE_TIME: +process.env.AZURE_EXPIRE_TIME || 3600000,
  LIST_PERMISSION: ['r', 'a', 'c', 'w', 'd', 'y', 't', 'i'],
};

export const googleConfig = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};

export const stripeConfig = {
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
  STRIPE_CURRENCY: process.env.STRIPE_CURRENCY,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
