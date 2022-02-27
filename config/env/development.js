import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DEV_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
};