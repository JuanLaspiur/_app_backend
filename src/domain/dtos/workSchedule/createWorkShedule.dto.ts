import { DaysOfWeekType, DaysOfWeekArray } from "../../../data/mogodb";

export class CreateWorkScheduleDto {
  constructor(
    public readonly day: DaysOfWeekType,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly notification: boolean = false,
    public readonly active: boolean = true,
  ) {}

  static create(props: any): [string?, CreateWorkScheduleDto?] {
    const { day, startTime, endTime, notification, active } = props;

    if (!day) return ['day is required', undefined];
    if (!startTime) return ['startTime is required', undefined];
    if (!endTime) return ['endTime is required', undefined];

    if (!DaysOfWeekArray.includes(day)) {
      return [`Invalid day value. Must be one of: ${DaysOfWeekArray.join(', ')}`, undefined];
    }

    return [undefined, new CreateWorkScheduleDto(
      day,
      startTime,
      endTime,
      notification ?? false,
      active ?? true
    )];
  }
}
