import { NoteModel } from "../../../data/mogodb/models/note.model";

export class GetAllNotesByUserIdUseCase {
  static async execute(userId: string) {
    return await NoteModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }
}