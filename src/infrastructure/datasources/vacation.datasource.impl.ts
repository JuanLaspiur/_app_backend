import { VacationEntity } from "../../domain/entities/vacation.entity";
import { VacationModel } from "../../data/mogodb";
import { CreateVacationDto, UpdateVacationDto } from "../../domain/dtos";
import { VacationMapper } from "../mappers/vacation.mapper";
import { VacationDataSource } from "../../domain";
import { GetAllUserVacationDto } from "../../domain/dtos/vacation/getAllUserVacation";

export class VacationDataSourceImp implements VacationDataSource {

  constructor(
    private readonly handleError: (error: unknown) => never
  ) {}

  async createVacation(dto: CreateVacationDto): Promise<VacationEntity> {
    try {
      const vacationDoc = await VacationModel.create({
        userId: dto.userId,
        totalDays: dto.totalDays,
        usedDays: dto.usedDays,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        status: dto.status || 'pendiente',
      });

      await vacationDoc.save();
      return VacationMapper.toEntity(vacationDoc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllVacations(): Promise<VacationEntity[]> {
    try {
      const docs = await VacationModel.find().sort({ createdAt: -1 });
      return VacationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllUserVacations(dto: GetAllUserVacationDto): Promise<VacationEntity[]> {
    try {
      const docs = await VacationModel.find({ userId: dto.userId }).sort({ createdAt: -1 });
      return VacationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateVacation(updateDto: UpdateVacationDto): Promise<VacationEntity | null> {
    try {
      const { id, ...updateFields } = updateDto;

      const vacation = await VacationModel.findByIdAndUpdate(
        id,
        {
          ...updateFields,
          startDate: updateFields.startDate ? new Date(updateFields.startDate) : undefined,
          endDate: updateFields.endDate ? new Date(updateFields.endDate) : undefined,
        },
        { new: true }
      );

      if (!vacation) return null;
      return VacationMapper.toEntity(vacation);
    } catch (error) {
      this.handleError(error);
    }
  }
}
