import { Router, Request, Response } from 'express';
import { serverValidation } from "./validations/serverValidation";
import { ServerService } from "./servers/serverService";
import { Server } from "./servers/server";
import httpProxy from "express-http-proxy";

const router = Router();

const serverService = new ServerService();

router.get("/", (_, res: Response) => res.json({ msg: "Middleware Running! 🌉" }));

router.get("/servers", (_, res: Response) => res.json(serverService.servers));

router.post("/servers", serverValidation, serverService.saveServers);

router.delete("/servers/:path", serverService.deleteServers);

serverService.servers.forEach((server: Server) => router.use(server.path, httpProxy(server.url)));

router.all("/{*path}", (_, res: Response) => res.status(404).json({ msg: "Middleware: Route Does Not Exists! 🛑🤚" }))

export default router;