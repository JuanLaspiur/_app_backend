import { NoteModel } from "../../../data/mogodb/models/note.model";
import { CreateNoteDto } from "../../dtos";

export class CreateNoteUseCase {
static  async execute(userId: string, dto: CreateNoteDto) {
    return await NoteModel.create({ userId, ...dto });
  }
}