import { NoteModel } from "../../../data/mogodb/models/note.model";
import { DeleteNoteDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class DeleteNoteUseCase {
 static async execute(userId: string, noteId: DeleteNoteDto) {
    const deleted = await NoteModel.findOneAndDelete({ id: noteId.id, userId });
    if (!deleted) throw CustomError.notFound(`Note with id ${noteId} not found or does not belong to the user`);
  }
}