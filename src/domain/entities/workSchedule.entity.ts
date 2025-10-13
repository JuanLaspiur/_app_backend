import { DaysOfWeekType } from "../../data/mogodb";

export class WorkScheduleEntity {
  constructor(
    public readonly id: string,
    public userId: string,
    public day: DaysOfWeekType,
    public startTime?: string,
    public endTime?: string,
    public notification: boolean = false,
    public active: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
