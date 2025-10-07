
export interface DeleteCalendarProps {
  id: string;
}

export class DeleteCalendarTaskDto {
  id: string;

  private constructor(props: DeleteCalendarProps) {
    this.id = props.id;
  }

  static create(props: DeleteCalendarProps): [string | null, DeleteCalendarTaskDto | null] {
    if (!props.id) return ["id is required", null];

    const instance = new DeleteCalendarTaskDto(props);
    return [null, instance];
  }
}
