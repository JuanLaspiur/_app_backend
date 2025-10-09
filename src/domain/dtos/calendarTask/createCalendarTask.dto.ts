
export interface CreateCalendarProps {
  title: string;
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
}

export class CreateCalendarTaskDto {
  title: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;

  private constructor(props: CreateCalendarProps) {
    this.title = props.title;
    this.date = new Date(props.date);
    if (props.startTime) this.startTime = new Date(props.startTime);
    if (props.endTime) this.endTime = new Date(props.endTime);
  }


  static create(props: CreateCalendarProps): [string | null, CreateCalendarTaskDto | null] {

    if (!props.title) return ["title is required", null];
    if (!props.date) return ["date is required", null];
    if (!props.startTime) return ["startTime is required", null];
    if (!props.endTime) return ["endTime is required", null];

    if (props.startTime && props.endTime) {
      const start = new Date(props.startTime);
      const end = new Date(props.endTime);
      if (end <= start) return ["endTime must be after startTime", null];
    }

    const instance = new CreateCalendarTaskDto(props);
    return [null, instance];
  }
}
