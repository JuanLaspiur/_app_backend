import { Router } from "express";
import { CalendarTaskController } from './controller';
import { CalendarTaskDataSourceImpl, CalendarTaskRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class  CalendarTaskRoutes{

    static get routes (): Router{
        const datasource = new CalendarTaskDataSourceImpl(verifyToken, handleError);
        const taskCalendarRepository = new CalendarTaskRepositoryImpl(datasource);
        const controller = new CalendarTaskController(taskCalendarRepository, handleErrorController);

        const router = Router();
        router.post('/create', controller.createCalendarTask.bind(controller));
        router.put('/update/:id', controller.updateCalendarTask.bind(controller));
        router.get('/getAll', controller.getAllCalendarTaskByJWT.bind(controller));
        router.delete('/delete/:id', controller.deleteCalendarTask.bind(controller));

        return router;
    }

}