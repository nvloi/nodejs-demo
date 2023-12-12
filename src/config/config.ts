import dotenv from 'dotenv';
dotenv.config();

export const config = {
    URL_API: process.env.API_URL || "",
};