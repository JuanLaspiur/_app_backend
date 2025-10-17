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

  static toEntityWithPopulate(data: any): WorkDayLogEntity {
    const schedule =
      data.scheduleId && typeof data.scheduleId === "object"
        ? {
            id: data.scheduleId.id,
            userId: data.scheduleId.userId,
            day: data.scheduleId.day,
            startTime: data.scheduleId.startTime,
            endTime: data.scheduleId.endTime,
            isWorkday: data.scheduleId.isWorkday,
          }
        : undefined;

    return new WorkDayLogEntity(
      data.id,
      data.userId,
      schedule as
        | {
            id: string;
            userId: string;
            day: string;
            startTime: string;
            endTime: string;
            isWorkday: boolean;
          },
      new Date(data.checkIn),
      data.checkOut ? new Date(data.checkOut) : undefined,
      data.status
    );
  }

  static toEntitiesWithPopulate(dataArray: any[]): WorkDayLogEntity[] {
    return dataArray.map(data => this.toEntityWithPopulate(data));
  }
}
