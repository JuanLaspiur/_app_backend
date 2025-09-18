import { VacationDataSource, VacationRepository, VacationEntity } from "../../domain";
import { CreateVacationDto, UpdateVacationDto } from "../../domain/dtos";
import { GetAllUserVacationDto } from "../../domain/dtos/vacation/getAllUserVacation";

export class VacationRepositoryImpl implements VacationRepository {

  constructor(private readonly vacationDataSource: VacationDataSource) {}


  async createVacation(dto: CreateVacationDto): Promise<VacationEntity> {
    return this.vacationDataSource.createVacation(dto);
  }

  async updateVacation(dto: UpdateVacationDto): Promise<VacationEntity|null> {
    return this.vacationDataSource.updateVacation(dto);
  }

   async getAllVacations(): Promise<VacationEntity | VacationEntity[]> {
  return this.vacationDataSource.getAllVacations();
  }
  async getAllUserVacations(dto: GetAllUserVacationDto): Promise<VacationEntity | VacationEntity[]> {
      return this.vacationDataSource.getAllUserVacations(dto);
  }

}
