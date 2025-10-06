export interface CreateNoteDtoProps {
  id: string;
  title: string;
  content: string;
}

export class CreateNoteDto {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
  ) {}

  static create(props: CreateNoteDtoProps): [string | null, CreateNoteDto | null] {
    const { id, title, content } = props;

    if (!id || id.trim() === '') {
      return ['El ID es requerido', null];
    }

    if (!title || title.trim() === '') {
      return ['El título es requerido', null];
    }

    if (!content || content.trim() === '') {
      return ['El contenido es requerido', null];
    }

    const note = new CreateNoteDto(id.trim(), title.trim(), content.trim());
    return [null, note];
  }
}
