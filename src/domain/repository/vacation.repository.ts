import { CreateVacationDto } from '../dtos/vacation/createVacation.dto';
import { GetAllUserVacationDto } from '../dtos/vacation/getAllUserVacation';
import { UpdateVacationDto } from '../dtos/vacation/updateVacation.dto';
import { VacationEntity } from '../entities/vacation.entity';

export abstract class VacationRepository {
    abstract createVacation(createDto:CreateVacationDto):Promise<VacationEntity>
    abstract updateVacation(updateDto:UpdateVacationDto):Promise<VacationEntity | null>
    abstract getAllVacations():Promise<VacationEntity | VacationEntity[]>
    abstract getAllUserVacations(dto:GetAllUserVacationDto):Promise<VacationEntity | VacationEntity[]>
    

}