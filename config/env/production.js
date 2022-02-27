import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.PROD_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
};