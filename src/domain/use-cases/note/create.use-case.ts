import { NoteModel } from "../../../data/mogodb/models/note.model";
import { CreateNoteDto } from "../../dtos";

export class Create {
static  async execute(userId: string, dto: CreateNoteDto) {
    return await NoteModel.create({ userId, ...dto });
  }
}