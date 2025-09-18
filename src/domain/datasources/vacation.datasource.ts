import { UpdateVacationDto } from '../dtos';
import { CreateVacationDto } from '../dtos/vacation/createVacation.dto';
import { GetAllUserVacationDto } from '../dtos/vacation/getAllUserVacation';
import { VacationEntity } from '../entities/vacation.entity';

export abstract class VacationDataSource {
    abstract createVacation(createDto:CreateVacationDto):Promise<VacationEntity>
    abstract updateVacation(updateDto:UpdateVacationDto):Promise<VacationEntity|null>
    abstract getAllVacations():Promise<VacationEntity | VacationEntity[]>
    abstract getAllUserVacations(dto:GetAllUserVacationDto):Promise<VacationEntity | VacationEntity[]>

}