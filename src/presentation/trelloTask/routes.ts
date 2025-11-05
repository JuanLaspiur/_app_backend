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

        // Existing routes
        router.post('/create', controller.createTrelloTask.bind(controller));
        router.get('/getAllByColumnId/:columnId', controller.getAllTrelloTaskByColumnId.bind(controller));

        // New routes
        router.post('/addMember', controller.addMember.bind(controller));
        router.post('/removeMember', controller.removeMember.bind(controller));
        router.post('/moveTaskToColumn', controller.moveTaskToColumn.bind(controller));
        router.delete('/delete/:taskId', controller.deleteTrelloTaskById.bind(controller));

        return router;
    }
}
