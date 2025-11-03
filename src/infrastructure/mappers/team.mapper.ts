import { TeamEntity } from "../../domain/entities/team.entity";

export class TeamMapper {
  static toEntity(doc: any): TeamEntity {
    return new TeamEntity(
      doc._id?.toString() ?? doc.id,
      doc.name,
      doc.members ?? [],
      doc.createdAt ? new Date(doc.createdAt) : new Date(),
      doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
      doc.projects 
    );
  }

  static toEntities(docs: any[]): TeamEntity[] {
    return docs.map((doc) => this.toEntity(doc));
  }
}


