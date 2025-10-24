import { Request, Response } from "express";
import { CreateDepartmentDto, jwtDto, UpdateDepartmentDto } from "../../domain/dtos";
import { CustomError, DepartmentRepository } from "../../domain";

export class DepartmentController {

    constructor(
        private readonly departmentRepository: DepartmentRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createDepartment(req: Request, res: Response) {
        try {
            const [errorTeam, createDepartmentDto] = CreateDepartmentDto.create(req.body);
            if (errorTeam || !createDepartmentDto) throw CustomError.badRequest(errorTeam ? errorTeam : 'Error create Department body info');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const team = await this.departmentRepository.createDepartment(dto, createDepartmentDto);
            return res.status(201).json(team);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getAllDepartments(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });

            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');

            const departaments = await this.departmentRepository.getAllDepartments(dto);
            return res.status(201).json(departaments);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async updatedDepartment(req: Request, res: Response) {
        try {
            const departmentId = req.params.id;
            const data = req.body;
            const [errorTeam, updateDepartmentDto] = UpdateDepartmentDto.create({ id: departmentId, ...data });
            if (errorTeam || !updateDepartmentDto) throw CustomError.badRequest(errorTeam ? errorTeam : 'Error update department body info');

            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');

            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const departament = await this.departmentRepository.updateDepartment(dto, updateDepartmentDto);
            return res.status(201).json(departament);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async deleteDepartment(req: Request, res: Response) {
        try {
            const departmentId = req.params.id;
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const departament = await this.departmentRepository.deleteDepartment(dto, departmentId);
            return res.status(201).json(departament);
        } catch (error) {
            this.handleError(error, res);
        }
    }

}
