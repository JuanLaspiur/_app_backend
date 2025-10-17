import { Router } from "express";
import { VacationController } from "./controller";
import { VacationDataSourceImp, VacationRepositoryImpl } from "../../infrastructure/";
import { verifyToken, handleError } from "../../config/helpers";

export class VacationRoutes {
    static get routes(): Router {
        const datasource = new VacationDataSourceImp(handleError);
        const vacationRepository = new VacationRepositoryImpl(datasource);

        const controller = new VacationController(vacationRepository, handleError);

        const router = Router();
        router.post('/create', controller.createVacation.bind(controller));
        router.put('/update', controller.updateVacation.bind(controller));
        router.get('/getAll', controller.getAllVacations.bind(controller));
        router.get('/getAllByUserId/:userId', controller.getAllUserVacations.bind(controller));

        return router;
    }
}
