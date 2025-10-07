
export interface DeleteCalendarProps {
  id: string;
}

export class DeleteCalendarTask {
  id: string;

  private constructor(props: DeleteCalendarProps) {
    this.id = props.id;
  }

  static create(props: DeleteCalendarProps): [string | null, DeleteCalendarTask | null] {
    if (!props.id) return ["id is required", null];

    const instance = new DeleteCalendarTask(props);
    return [null, instance];
  }
}
