import { WorkDayLogEntity } from "../../domain";

export class WorkDayLogMapper {

  static toEntity(data: any): WorkDayLogEntity {
    return new WorkDayLogEntity(
      data.id,
      data.userId,
      data.scheduleId,
      new Date(data.checkIn),
      data.checkOut ? new Date(data.checkOut) : undefined,
      data.status
    );
  }

  static toEntities(dataArray: any[]): WorkDayLogEntity[] {
    return dataArray.map(data => this.toEntity(data));
  }
}