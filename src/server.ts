import cors, {CorsOptions} from "cors";
import morgan from "morgan";
import Routes from "./routes";
import express, {Application} from "express";

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: "*"
        };

        app.use(morgan('tiny'));
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
    }
}