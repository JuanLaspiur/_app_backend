import "dotenv/config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { MongoDataBase } from "./data/mogodb";

(() => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    dbName: process.env.MONGO_DB_NAME!,
    mongoUrl: process.env.MONGO_URL!,
  });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const server = new Server(port, AppRoutes.routes);

  server.start();
}