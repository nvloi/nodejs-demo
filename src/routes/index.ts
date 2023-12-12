import {Application} from "express";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import songRoutes from "./song.routes";
import graphQLRoutes from "./graphql.routes";
import albumRoutes from "./album.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api", homeRoutes);
        app.use("/api/auth", authRoutes);
        app.use("/api/song", songRoutes);
        app.use("/api/album", albumRoutes);
        app.use('/graphql', graphQLRoutes);
    }
}