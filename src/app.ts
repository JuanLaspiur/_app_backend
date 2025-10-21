import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { MongoDataBase } from "./data/mogodb";
import { envs } from "./config/env";

(() => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME!,
    mongoUrl: envs.MONGO_URL!,
  });

  const port = envs.PORT ? envs.PORT: 3000;
  const server = new Server(port, AppRoutes.routes);

  server.start();
}