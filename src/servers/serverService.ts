import serversJson from "../../servers.json";
import { Server } from "./server";
import httpProxy from "express-http-proxy";
import { Express, Request, Response } from "express";
import fs from "fs";

export class ServerService {
    servers: Server[] = serversJson;

    loadRoutes(app: Express) {
        app.get("/", (_, res: Response) => res.json({ msg: "Middleware Runnin! 🌉" }));

        app.get("/servers", (_, res: Response) => res.json(this.servers));

        app.post("/servers", (req: Request, res: Response) => res.json(this.saveServers(req)));
        app.delete("/servers/:path", (req: Request, res: Response) => res.json(this.deleteServers(req)));

        this.servers.forEach((server: Server) => app.use(server.path, httpProxy(server.url)));

        app.all("/{*path}", (_, res: Response) => res.status(404).json({ msg: "Middleware: Route Does Not Exists! 🛑🤚" }))
    }

    saveServers(req: Request) {
        const server = new Server(req.body.name, req.body.path, req.body.url);

        if (!server.path.startsWith("/"))
            server.path = "/" + server.path;

        if (this.servers.some(s => s.path == server.path))
            return this.servers;

        this.servers.push(server);
        fs.writeFileSync("./servers.json", JSON.stringify(this.servers, null, 2));
        return this.servers;
    }

    deleteServers(req: Request) {
        let path = req.params.path;

        if (!path)
            return this.servers;

        if (!path.startsWith("/"))
            path = "/" + path;

        if (!this.servers.some(s => s.path == path))
            return this.servers;

        this.servers = this.servers.filter(s => s.path != path);
        fs.writeFileSync("./servers.json", JSON.stringify(this.servers, null, 2));
        return this.servers;
    }
}
