import { Router } from "express";
import { TeamController } from './controller';
import { TeamDataSourceImpl, TeamRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class TeamRoutes{

    static get routes (): Router{
        const datasource = new TeamDataSourceImpl(verifyToken, handleError);
        const teamRepository = new TeamRepositoryImpl(datasource);
        const controller = new TeamController(teamRepository, handleErrorController);

        const router = Router();
        router.post('/create', controller.createTeam.bind(controller));
        router.put('/update/:id', controller.updatedTeam.bind(controller));
        router.get('/getAll', controller.getAllTeams.bind(controller));
        router.delete('/delete/:id', controller.deleteTeam.bind(controller));

        return router;
    }

}