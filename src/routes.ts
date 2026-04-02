import { Router, Response } from 'express';
import { serverValidation } from "./validations/serverValidation";
import { ServerService } from "./servers/serverService";

const router = Router();

const serverService = new ServerService();

router.get("/", (_, res: Response) => res.json({
    msg: "Middleware Running! 🌉"
}));

router.get("/servers", serverService.getAll);

router.post("/servers", serverValidation, serverService.saveServers);

router.delete("/servers/:path", serverService.deleteServers);

serverService.loadServers(router);

router.all("/{*path}", (_, res: Response) =>
    res.status(404).json({
        msg: "Middleware: Route Does Not Exists! 🛑🤚"
    }))

export default router;