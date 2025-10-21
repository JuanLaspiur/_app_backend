import { Request, Response } from "express";
import { AddMemberDto, CreateTeamDto, jwtDto, RemoveMemberDto, UpdateTeamDto } from "../../domain/dtos";
import { CustomError, TeamRepository } from "../../domain";

export class TeamController {

    constructor(
        private readonly teamRepository: TeamRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createTeam(req: Request, res: Response) {
        try {
            const data = req.body;
            const departmentId = req.params.departmentId;
            const [errorTeam, createTeamDto] = CreateTeamDto.create({ departmentId, ...data });
            if (errorTeam || !createTeamDto) throw CustomError.badRequest(errorTeam ? errorTeam : 'Error create team body info');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamRepository.createTeam(dto, createTeamDto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getAllTeams(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');

            const teams = await this.teamRepository.getAllTeams(dto);
            return res.status(201).json(teams);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async updatedTeam(req: Request, res: Response) {
        try {
            const teamId = req.params.id;
            const data = req.body;
            const [errorTeam, updateTeamDto] = UpdateTeamDto.create({ id: teamId, ...data });
            if (errorTeam || !updateTeamDto) throw CustomError.badRequest(errorTeam ? errorTeam : 'Error update team body info');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamRepository.updateTeam(dto, updateTeamDto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async deleteTeam(req: Request, res: Response) {
        try {
            const teamId = req.params.id;
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
             await this.teamRepository.deleteTeam(dto, teamId);
             return res.status(201).json({message:"Team has been deleted"});
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async addMember(req: Request, res: Response) {
        try {
            const teamId = req.params.id;
            const data = req.body;
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const [error, dtaDto] = AddMemberDto.create({ teamId, ...data })
            if (error || !dtaDto) throw CustomError.badRequest(error ? error : 'Unauthorized');
            const team = await this.teamRepository.addMember(dto, dtaDto);
            return res.status(201).json(team);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    
    async removeMember(req: Request, res: Response) {
        try {
            const teamId = req.params.id;
            const data = req.body;
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const [error, dtaDto] = RemoveMemberDto.create({ teamId, ...data })
            if (error || !dtaDto) throw CustomError.badRequest(error ? error : 'Unauthorized');
            const team = await this.teamRepository.removeMember(dto, dtaDto);
            return res.status(201).json(team);
        } catch (error) {
            this.handleError(error, res);
        }
    }

}
