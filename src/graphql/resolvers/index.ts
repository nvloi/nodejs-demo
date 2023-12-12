import * as Queries from "./Queries/index";
import * as Mutations from "./Mutations/index";
import * as Song from "./Song/index";
export const resolvers = {
    Query: {
        ...Queries,
    },
    Mutation: {
        ...Mutations,
    },
    Song: {
        ...Song
    }
};