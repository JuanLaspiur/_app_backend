import { Router } from "express";
import { CalendarTaskController } from './controller';
import { CalendarTaskDataSourceImpl, CalendarTaskRepositoryImpl } from "../../infrastructure";

export class  CalendarTaskRoutes{

    static get routes (): Router{
        const datasource = new CalendarTaskDataSourceImpl();
        const taskCalendarRepository = new CalendarTaskRepositoryImpl(datasource);
        const controller = new CalendarTaskController(taskCalendarRepository);

        const router = Router();
        router.post('/create', controller.createCalendarTask.bind(controller));
        router.put('/update/:id', controller.updateCalendarTask.bind(controller));
        router.get('/getAll', controller.getAllCalendarTaskByJWT.bind(controller));
        router.delete('/delete/:id', controller.deleteCalendarTask.bind(controller));

        return router;
    }

}