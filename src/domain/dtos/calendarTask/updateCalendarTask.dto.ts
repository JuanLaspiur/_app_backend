
export interface UpdateCalendarProps {
  id: string;            
  title?: string;
  date?: string | Date;
  startTime?: string | Date;
  endTime?: string | Date;
}

export class UpdateCalendarTaskDto {
  id: string;
  title?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;

  private constructor(props: UpdateCalendarProps) {
    this.id = props.id;
    if (props.title) this.title = props.title;
    if (props.date) this.date = new Date(props.date);
    if (props.startTime) this.startTime = new Date(props.startTime);
    if (props.endTime) this.endTime = new Date(props.endTime);
  }

  static create(props: UpdateCalendarProps): [string | null, UpdateCalendarTaskDto | null] {
    if (!props.id) return ["id is required", null];

    if (props.startTime && props.endTime) {
      const start = new Date(props.startTime);
      const end = new Date(props.endTime);
      if (end <= start) return ["endTime must be after startTime", null];
    }

    const instance = new UpdateCalendarTaskDto(props);
    return [null, instance];
  }
}
