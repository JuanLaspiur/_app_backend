export interface CreateNoteDtoProps {
  title: string;
  content: string;
}

export class CreateNoteDto {
  private constructor(
    public readonly title: string,
    public readonly content: string,
  ) {}

  static create(props: CreateNoteDtoProps): [string | null, CreateNoteDto | null] {
    const { title, content } = props;

    if (!title || title.trim() === '') {
      return ['El título es requerido', null];
    }

    if (!content || content.trim() === '') {
      return ['El contenido es requerido', null];
    }

    const note = new CreateNoteDto(title.trim(), content.trim());
    return [null, note];
  }
}
