import { Router } from "express";
import { WorkDayLogController } from './controller';
import { WorkDayLogRepositoryImpl, WorkDayLogDataSourceImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class WorkDayLogRoutes {

    static get routes(): Router {
        const datasource = new WorkDayLogDataSourceImpl(verifyToken, handleError);
        const workLogRepository = new WorkDayLogRepositoryImpl(datasource);
        const controller = new WorkDayLogController(workLogRepository, handleErrorController);

        const router = Router();
        router.put('/open/:id', controller.openLog.bind(controller));
        router.put('/close/:id', controller.closeLog.bind(controller));
        router.get('/getAll', controller.getAllUserLogs.bind(controller));
        
        return router;
    }

}