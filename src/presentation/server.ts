import express, { Application, Router } from "express";
import path from "path";
import cors from "cors";

export class Server {
  private readonly port: number;
  private readonly app: Application;
  private readonly routes: Router;

  constructor(port: number, routes: Router) {
    this.port = port;
    this.app = express();
    this.routes = routes;
    this.middlewares();
  }

  private middlewares(): void {

    this.app.use(cors());  // TO DO usar patron adaptador y cerrar en producción


    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));
    this.app.use(this.routes);
  }

  public async start(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}
