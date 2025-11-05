import { Router } from "express";
import { TrelloTaskController } from './controller';
import { TrelloTaskDataSourceImpl, TrelloTaskRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class TrelloTaskRoutes {

    static get routes(): Router {
        const datasource = new TrelloTaskDataSourceImpl(verifyToken, handleError);
        const trelloTaskRepository = new TrelloTaskRepositoryImpl(datasource);
        const controller = new TrelloTaskController(trelloTaskRepository, handleErrorController);

        const router = Router();
        router.post('/create/', controller.createTrelloTask.bind(controller));
         router.get('/getAllByColumnId/:columnId', controller.getAllTrelloTaskByColumnId.bind(controller));
        return router;
    }

}