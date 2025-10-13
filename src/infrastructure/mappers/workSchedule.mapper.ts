import { WorkScheduleEntity } from "../../domain";

export class WorkScheduleMapper {
  // Convierte un objeto plano en una entidad
  static toEntity(data: any): WorkScheduleEntity {
    return new WorkScheduleEntity(
      data.id || data._id?.toString(),
      data.userId,
      data.day,
      data.startTime,
      data.endTime,
      data.notification ?? false,
      data.active ?? true,
      data.createdAt ? new Date(data.createdAt) : new Date(),
      data.updatedAt ? new Date(data.updatedAt) : new Date(),
    );
  }

  static toEntities(dataArray: any[]): WorkScheduleEntity[] {
    if (!Array.isArray(dataArray)) return [];
    return dataArray.map((item) => this.toEntity(item));
  }
}
