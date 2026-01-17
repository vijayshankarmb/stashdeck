import { env } from "./config";
import { startServer } from "./server";

const main = () => {
    startServer(env.PORT);
}

main();
