import { CustomError, ProyectDataSource, ProyectEntity } from "../../domain";
import { jwtDto, CreateProyectDto, UpdateProyectDto } from "../../domain/dtos";
import * as ProyectsUseCases from "../../domain/use-cases/proyect"
import { ProyectMapper } from "../mappers/proyect.mapper";

export class ProyectDataSourceImpl implements ProyectDataSource {

    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) { }
    private authorize(dto: jwtDto) {
        const userId = this.verifyToken(dto);
        if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
        return userId;
    }

    async createProyect(dto: jwtDto, createProyectDto: CreateProyectDto): Promise<ProyectEntity> {
        try {
            this.authorize(dto);
            const proyect = await ProyectsUseCases.Create.execute(createProyectDto)
            return ProyectMapper.toEntity(proyect)
        } catch (error) {
            this.handleError(error);
        }
    }
    async getAllProyect(dto: jwtDto): Promise<ProyectEntity[]> {
        try {
            this.authorize(dto);
            const proyects = await ProyectsUseCases.GetAll.execute()
            return ProyectMapper.toEntities(proyects)
        } catch (error) {
            this.handleError(error);
        }
    }
    async updateProyect(dto: jwtDto, updateProyectDto: UpdateProyectDto): Promise<ProyectEntity> {
        try {
            this.authorize(dto);
            const proyect = await ProyectsUseCases.Update.execute(updateProyectDto)
            return ProyectMapper.toEntity(proyect)
        } catch (error) {
            this.handleError(error);
        }
    }

}