import { env } from "./config";
import { startServer } from "./server";
import "./lib/redis";

const main = () => {
    startServer(env.PORT);
}

main();
