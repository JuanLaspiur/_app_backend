import { Router } from "express";
import { ProyectController } from "./controller";
import { ProyectDataSourceImpl, ProyectRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class ProyectRoutes {
    static get routes(): Router {
        const datasource = new ProyectDataSourceImpl(verifyToken, handleError);
        const proyectRepository = new ProyectRepositoryImpl(datasource);
        const controller = new ProyectController(proyectRepository, handleErrorController);

        const router = Router();
        router.post('/create/', controller.createProyect.bind(controller));
        router.get('/getAll', controller.getAllProyects.bind(controller));
        router.put('/update/:id', controller.updateProyect.bind(controller));
        return router;
    }
}