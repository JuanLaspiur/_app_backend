import { WorkLogEntity } from "../../domain";

export class WorkLogMapper {

  static toEntity(data: any): WorkLogEntity {
    return new WorkLogEntity(
      data.id,
      data.userId,
      data.scheduleId,
      new Date(data.checkIn),
      data.checkOut ? new Date(data.checkOut) : undefined,
      data.notes
    );
  }

  static toEntities(dataArray: any[]): WorkLogEntity[] {
    return dataArray.map(data => this.toEntity(data));
  }
}