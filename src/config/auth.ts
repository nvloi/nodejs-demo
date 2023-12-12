import dotenv from 'dotenv';
dotenv.config();

export const authConfig = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || "",
    REFRESH_TOKEN_SIZE: parseInt(process.env.REFRESH_TOKEN_SIZE!)
};