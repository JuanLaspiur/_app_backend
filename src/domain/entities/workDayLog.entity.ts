
export class WorkDayLogEntity {
  constructor(
    public readonly id: string,
    public userId: string,
    public scheduleId: string, 
    public checkIn: Date,
    public checkOut?: Date,
    public status?: string,
  ) {}
}
