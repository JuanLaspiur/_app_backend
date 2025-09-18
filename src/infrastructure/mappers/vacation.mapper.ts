import { VacationEntity, VacationStatus } from "../../domain/entities/vacation.entity";

export class VacationMapper {
  static toEntity(vacationDoc: any): VacationEntity {
    return new VacationEntity(
      vacationDoc.id || vacationDoc._id?.toString(),
      vacationDoc.userId,
      vacationDoc.totalDays,
      vacationDoc.usedDays,
      new Date(vacationDoc.startDate),
      new Date(vacationDoc.endDate),
      vacationDoc.status as VacationStatus,
      new Date(vacationDoc.createdAt),
      new Date(vacationDoc.updatedAt)
    );
  }

  static toEntities(vacationDocs: any[]): VacationEntity[] {
    return vacationDocs.map(doc => this.toEntity(doc));
  }
}
