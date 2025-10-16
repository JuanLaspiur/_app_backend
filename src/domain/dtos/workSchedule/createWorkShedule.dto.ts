import { DaysOfWeekType, DaysOfWeekArray } from "../../../data/mogodb";

export class CreateWorkScheduleDto {
  constructor(
    public readonly day: DaysOfWeekType,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly isWorkday : Boolean
  ) {}

  static create(props: any): [string?, CreateWorkScheduleDto?] {
    const { day, startTime, endTime, isWorkday } = props;

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
      isWorkday
    )];
  }
}

/// crear semana de horarios 
// despues crear el log semanal
// despues crear el log diario