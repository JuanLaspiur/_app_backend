export interface DeleteNoteDtoProps {
  id: string;
}

export class DeleteNoteDto {
  private constructor(public readonly id: string) {}

  static create(props: DeleteNoteDtoProps): [string | null, DeleteNoteDto | null] {
    const { id } = props;

    if (!id || id.trim() === '') {
      return ['El ID de la nota es requerido', null];
    }

    const dto = new DeleteNoteDto(id.trim());
    return [null, dto];
  }
}
