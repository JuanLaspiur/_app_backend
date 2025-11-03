import { Request, Response } from "express";
import { jwtDto, CreateProyectDto, UpdateProyectDto } from "../../domain/dtos";
import { CustomError, ProyectRepository } from "../../domain";

export class ProyectController {
    constructor(
        private readonly proyectRepository: ProyectRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createProyect(req: Request, res: Response) {
        try {
            const [errorProyect, createProyectDto] = CreateProyectDto.create(req.body);
            if (errorProyect || !createProyectDto) throw CustomError.badRequest(errorProyect ? errorProyect : 'Error create proyect body info');
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const proyect = await this.proyectRepository.createProyect(dto, createProyectDto);
            return res.status(201).json(proyect);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getAllProyects(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const proyects = await this.proyectRepository.getAllProyect(dto);
            return res.status(201).json(proyects);
        } catch (error) {
            this.handleError(error, res);
        }
    }
    async updateProyect(req: Request, res: Response) {
        try {
            const proyectId = req.params.id;
            const [errorProyect, updateProyectDto] = UpdateProyectDto.create({id: proyectId, ...req.body});
            if (errorProyect || !updateProyectDto) throw CustomError.badRequest(errorProyect ? errorProyect : 'Error update proyect body info');
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const proyects = await this.proyectRepository.updateProyect(dto, updateProyectDto);
            return res.status(201).json(proyects);
        } catch (error) {
            this.handleError(error, res);
        }
    }






}