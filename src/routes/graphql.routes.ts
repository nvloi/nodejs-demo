import { Router } from "express";
import {graphqlHTTP} from "express-graphql";
import {resolvers, typeDefs} from "../graphql";
import {makeExecutableSchema} from "@graphql-tools/schema";

class GraphQLRoutes {
    router = Router();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.use(graphqlHTTP({
            schema: makeExecutableSchema({
                typeDefs,
                resolvers
            }),
            graphiql: true
        }));
    }
}

export default new GraphQLRoutes().router;