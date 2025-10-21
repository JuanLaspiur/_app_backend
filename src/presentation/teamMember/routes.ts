import { Router } from "express";
import { TeamMemberController } from './controller';
import { TeamMemberDataSourceImpl, TeamMemberRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class TeamMemberRoutes {

    static get routes(): Router {
        const datasource = new TeamMemberDataSourceImpl(verifyToken, handleError);
        const teamMemberRepository = new TeamMemberRepositoryImpl(datasource);
        const controller = new TeamMemberController(teamMemberRepository, handleErrorController);

        const router = Router();
        router.post('/create/', controller.createTeamMember.bind(controller));
        router.put('/update/:id', controller.updateTeamMember.bind(controller));
        router.get('/getAll', controller.getAllTeamMembers.bind(controller));
        router.get('/getOwn', controller.getUserTeamMember.bind(controller));
        router.delete('/delete/:id', controller.deleteTeamMember.bind(controller));
        
        return router;
    }

}