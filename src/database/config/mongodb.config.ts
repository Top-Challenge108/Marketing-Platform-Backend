import * as dotenv from 'dotenv';
dotenv.config();
export function mongoConfig() {
  return {
    uri: process.env.COMMON_API_MONGODB_URI,
  };
}
