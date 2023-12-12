import express, {Application} from "express";
import Server from "./server";
import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(process.env.PORT!);
const HOST = process.env.HOST || "";
const GraphQLSandbox = process.env.GRAPHQL_SANDBOX || "";
const GraphQLUrl = process.env.GRAPHQL_URL || "";

const app: Application = express();
new Server(app);

app.listen(PORT, HOST, function () {
    console.log(`Server is running on: http://${HOST}:${PORT}`);
    console.log(`GraphQL Sandbox: ${GraphQLSandbox}`);
    console.log(`GraphQL URL: ${GraphQLUrl}`);
});