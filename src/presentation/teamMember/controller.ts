import { Request, Response } from "express";
import { jwtDto, CreateTeamMemberDto, UpdateTeamMemberDto } from "../../domain/dtos";
import { CustomError, TeamMemberRepository } from "../../domain";


export class TeamMemberController {
    constructor(
        private readonly teamMemberRepository: TeamMemberRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createTeamMember(req: Request, res: Response) {
        try {
            const [errorMember, createTeamMemberDto] = CreateTeamMemberDto.create(req.body);
            if (errorMember || !createTeamMemberDto) throw CustomError.badRequest(errorMember ? errorMember : 'Error create team member body info');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamMemberRepository.createTeamMember(dto, createTeamMemberDto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }


    async getUserTeamMember(req: Request, res: Response) {
        try {
              const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamMemberRepository.getUserTeamMember(dto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async updateTeamMember(req: Request, res: Response) {
        try {
             const [errorMember, updateTeamMemberDto] = UpdateTeamMemberDto.create(req.body);
             if (errorMember || !updateTeamMemberDto) throw CustomError.badRequest(errorMember ? errorMember : 'Error update team member body info');
              const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamMemberRepository.updateTeamMember(dto, updateTeamMemberDto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async deleteTeamMember(req: Request, res: Response) {
        try {
            const teamId = req.params.id;
             if (!teamId) throw CustomError.badRequest('Error delete team member :id by params ');
              const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamMemberRepository.deleteTeamMember(dto, teamId);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }
        async getAllTeamMembers(req: Request, res: Response) {
        try {
              const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.teamMemberRepository.getAllTeamMembers(dto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }


}