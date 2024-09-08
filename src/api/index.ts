// - Modifies global `Reflect` object (or defines one in ES5 runtimes).
import "reflect-metadata";

import { env } from "./common/utils/envConfig";
import { logger } from "./common/utils/logger";
import app from "./server";
import { dataSource } from "../infra";

(async () => {
  await dataSource.initialize();

  const server = app.listen(env.PORT, () => {
    const { NODE_ENV, HOST, PORT } = env;
    logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  });

  const onCloseSignal = () => {
    logger.info("sigint received, shutting down");
    server.close(() => {
      logger.info("server closed");
      process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
  };

  process.on("SIGINT", onCloseSignal);
  process.on("SIGTERM", onCloseSignal);
})();
