export class WorkDayLogEntity {
  constructor(
    public id: string,
    public userId: string,
    public scheduleId: string | {
      id: string;
      userId: string;
      day: string;
      startTime: string;
      endTime: string;
      isWorkday: boolean;
    },
    public checkIn: Date,
    public checkOut?: Date,
    public status?: string
  ) {}
}