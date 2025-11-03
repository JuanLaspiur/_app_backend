import { jwtDto } from "../dtos";
import { CreateProyectDto, UpdateProyectDto } from "../dtos";
import { ProyectEntity } from "../entities/proyect.entity";

export abstract class ProyectDataSource {
    abstract createProyect(dto: jwtDto, createProyectDto:CreateProyectDto):Promise<ProyectEntity>;
    abstract getAllProyect(dto: jwtDto):Promise<ProyectEntity[]>;
    abstract updateProyect(dto: jwtDto, updateProyectDto: UpdateProyectDto): Promise<ProyectEntity>;

    
}