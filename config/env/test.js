import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.TEST_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
};