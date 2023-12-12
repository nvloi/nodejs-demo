import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
    HOST: process.env.DB_HOST || "",
    USER: process.env.DB_USER || "",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_NAME || "",
    DIALECT: process.env.DB_DIALECT || ""
};