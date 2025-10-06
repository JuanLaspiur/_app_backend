import { NoteEntity } from "../../domain";
import { NoteModel } from "../../data/mogodb/models/note.model";

export class NoteMapper {
  static toEntity(note: any): NoteEntity {
    if (!note) throw new Error("NoteMapper.toEntity: note is null or undefined");

    return {
      id: note._id?.toString() ?? note.id,
      title: note.title,
      content: note.content,
      userId: note.userId?.toString?.() ?? note.userId,
      createdAt: note.createdAt ? new Date(note.createdAt) : new Date(),
      updatedAt: note.updatedAt ? new Date(note.updatedAt) : new Date(),
    };
  }

  static toEntities(notes: any[]): NoteEntity[] {
    if (!Array.isArray(notes)) {
      throw new Error("NoteMapper.toEntities: input is not an array");
    }

    return notes.map((note) => this.toEntity(note));
  }
}
