import { CalendarTaskEntity } from "../../domain";

export class CalendarTaskMapper {

  static toEntity(data: any): CalendarTaskEntity {
    return new CalendarTaskEntity(
      data.id || data._id?.toString(),
      data.title,
      data.userId,
      data.date?.toISOString?.() || data.date,   
      data.startTime?.toISOString?.() || data.startTime,
      data.endTime?.toISOString?.() || data.endTime,
      data.createdAt ? new Date(data.createdAt) : new Date(),
      data.updatedAt ? new Date(data.updatedAt) : new Date(),
      data.notification ? data.notification : false

    );
  }

  static toEntities(dataArray: any[]): CalendarTaskEntity[] {
    return dataArray.map(item => this.toEntity(item));
  }
}
