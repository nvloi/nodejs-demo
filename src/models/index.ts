import {Dialect, Sequelize} from 'sequelize';
import {dbConfig} from "../config/database";
export const sequelize =  new Sequelize({
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT as Dialect
});