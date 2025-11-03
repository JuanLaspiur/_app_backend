import { ProyectDataSource, ProyectEntity, ProyectRepository } from "../../domain";
import { jwtDto, CreateProyectDto, UpdateProyectDto } from "../../domain/dtos";

export  class ProyectRepositoryImpl implements ProyectRepository {

    constructor(private readonly dataSource: ProyectDataSource) { }
    createProyect(dto: jwtDto, createProyectDto: CreateProyectDto): Promise<ProyectEntity> {
        return this.dataSource.createProyect(dto, createProyectDto);
    }
    getAllProyect(dto: jwtDto): Promise<ProyectEntity[]> {
        return this.dataSource.getAllProyect(dto);
    }
    updateProyect(dto: jwtDto, updateProyectDto: UpdateProyectDto): Promise<ProyectEntity> {
         return this.dataSource.updateProyect(dto,updateProyectDto);
    }



}