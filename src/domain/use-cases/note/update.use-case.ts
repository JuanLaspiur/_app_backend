import { NoteModel } from "../../../data/mogodb/models/note.model";
import { UpdateNoteDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class UpdateNoteUseCase {
  static async execute(userId: string, dto: UpdateNoteDto) {
    const doc = await NoteModel.findOneAndUpdate(
      { _id: dto.id, userId },
      dto,
      { new: true }
    );
    if (!doc) throw CustomError.notFound(`Note with id ${dto.id} not found or does not belong to the user`);
    return doc;
  }
}