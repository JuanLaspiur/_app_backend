import { Router } from "express";
import { WorkLogController } from './controller';
import { WorkLogRepositoryImpl, WorkLogDataSourceImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class WorkScheduleRoutes {

    static get routes(): Router {
        const datasource = new WorkLogDataSourceImpl(verifyToken, handleError);
        const workLogRepository = new WorkLogRepositoryImpl(datasource);
        const controller = new WorkLogController(workLogRepository, handleErrorController);

        const router = Router();
        router.post('/create', controller.createWorkSchedule.bind(controller));
        router.put('/update/:id', controller.updateWorkSchedule.bind(controller));
        router.get('/getAll', controller.getAllUserWorkSchedule.bind(controller));
        router.delete('/delete/:id', controller.deleteWorkSchedule.bind(controller));
        router.delete('/deleteAll', controller.deleteAllUserWorkSchedules.bind(controller));
        return router;
    }

}