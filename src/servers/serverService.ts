import serversJson from "../../servers.json";
import { Server } from "./server";
import { Request, Response } from "express";
import fs from "fs";
import { validationResult } from "express-validator";


export class ServerService {
    servers: Server[] = serversJson;

    saveServers = (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(e => e.msg) });
        }

        const server = new Server(
            req.body.name,
            req.body.path,
            req.body.url,
            req.body.secure);

        if (server.path && !server.path.startsWith("/"))
            server.path = "/" + server.path;

        if (this.servers.some(s => s.path == server.path))
            return res.status(400).json({ errors: ["Server already exists"] });

        this.servers.push(server);
        fs.writeFileSync("./servers.json", JSON.stringify(this.servers, null, 2));
        return res.json(this.servers);
    }

    deleteServers = (req: Request, res: Response) => {
        let path = req.params.path;

        if (!path)
            return res.json(this.servers);

        if (!path.startsWith("/"))
            path = "/" + path;

        if (!this.servers.some(s => s.path == path))
            return res.json(this.servers);

        this.servers = this.servers.filter(s => s.path != path);
        fs.writeFileSync("./servers.json", JSON.stringify(this.servers, null, 2));
        return res.json(this.servers);
    }
}
