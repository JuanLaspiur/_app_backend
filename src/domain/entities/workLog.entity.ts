import { WorkScheduleEntity } from "./workSchedule.entity";

export class WorkLogEntity {
  constructor(
    public readonly id: string,
    public userId: string,
    public scheduleId: string, 
    public checkIn: Date,
    public checkOut?: Date,
    public notes?: string,
  ) {}
}
