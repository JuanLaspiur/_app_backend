export interface UpdateNoteDtoProps {
  id?: string;
  title?: string;
  content?: string; 
}

export class UpdateNoteDto {
  private constructor(
    public readonly id?: string,
    public readonly title?: string,
    public readonly content?: string,
  ) {}

  static create(props: UpdateNoteDtoProps): [string | null, UpdateNoteDto | null] {
    const { id, title, content } = props;

    if (!id && !title && !content) {
      return ['Debe especificar al menos un campo para actualizar', null];
    }

    if (title !== undefined && title.trim() === '') {
      return ['El título no puede estar vacío', null];
    }

    if (content !== undefined && content.trim() === '') {
      return ['El contenido no puede estar vacío', null];
    }

    const dto = new UpdateNoteDto(
      id?.trim(),
      title?.trim(),
      content?.trim()
    );

    return [null, dto];
  }
}
