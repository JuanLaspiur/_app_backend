import { DaysOfWeekType } from "../../../data/mogodb";

export class UpdateWorkScheduleDto {
  constructor(
    public readonly id: string,
    public readonly day?: DaysOfWeekType,
    public readonly startTime?: string,
    public readonly endTime?: string,
    public readonly notification?: boolean,
    public readonly active?: boolean,
  ) {}

  static create(props: any): [string?, UpdateWorkScheduleDto?] {
    const { id, day, startTime, endTime, notification, active } = props;

    if (!id) return ['id is required', undefined];

    return [undefined, new UpdateWorkScheduleDto(
      id,
      day,
      startTime,
      endTime,
      notification,
      active
    )];
  }
}
