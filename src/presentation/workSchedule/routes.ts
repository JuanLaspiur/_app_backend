import { Router } from "express";
import { WorkScheduleController } from './controller';
import { WorkScheduleDataSourceImpl, WorkScheduleRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class WorkScheduleRoutes{

    static get routes (): Router{
        const datasource = new WorkScheduleDataSourceImpl(verifyToken, handleError);
        const workScheduleRepository = new WorkScheduleRepositoryImpl(datasource);
        const controller = new WorkScheduleController(workScheduleRepository, handleErrorController);

        const router = Router();
        router.post('/create', controller.createWorkSchedule.bind(controller));
        router.put('/update/:id', controller.updateWorkSchedule.bind(controller));
        router.get('/getAll', controller.getAllUserWorkSchedule.bind(controller));

        return router;
    }

}