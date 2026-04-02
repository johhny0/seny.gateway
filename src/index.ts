import { EnvConfig } from "./envConfig";
import { ExpressService } from "./api/expressService";
import routes from "./routes";

//https://cloudnweb.dev/2019/09/building-a-production-ready-node-js-app-with-typescript-and-docker/
//https://www.npmjs.com/package/http-proxy-middleware

//TODO: ADD TESTS
//TODO: ADD SWAGGER
//TODO: ADD JWT
//TODO: ADD ORM

async function main() {
    const config = new EnvConfig();
    config.load();

    const expressService = new ExpressService()
    const app = expressService.config(config);

    app.use(routes);

    app.listen(config.port, () => console.log(`🔥 ${config.applicationName}. Server running at: ${config.host}:${config.port}`));
}

main();