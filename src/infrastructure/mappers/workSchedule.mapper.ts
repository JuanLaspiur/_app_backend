import { WorkScheduleEntity } from "../../domain";

export class WorkScheduleMapper {
  static toEntity(data: any): WorkScheduleEntity {
    return new WorkScheduleEntity(
      data.id || data._id?.toString(),
      data.userId,
      data.day,
      data.startTime,
      data.endTime,
      data.isWorkday
    );
  }

  static toEntities(dataArray: any[]): WorkScheduleEntity[] {
    if (!Array.isArray(dataArray)) return [];
    return dataArray.map((item) => this.toEntity(item));
  }
}
