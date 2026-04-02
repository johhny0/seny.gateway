import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import express, { Express } from "express";

import { EnvConfig } from "../envConfig";

export class ExpressService {

    private app: Express = express();

    config(config: EnvConfig): Express {

        if (config.useCors)
            this.app.use(cors());
        if (config.useMorgan)
            this.app.use(morgan(config.morganFormat));
        if (config.useHelmet)
            this.app.use(helmet());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        return this.app;
    }
}