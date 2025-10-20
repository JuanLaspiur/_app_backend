import { DepartmentEntity } from "../../domain";
import { TeamEntity } from "../../domain";

export class DepartamentMapper {
  static toEntity(doc: any): DepartmentEntity {
    return new DepartmentEntity(
      doc._id.toString(),
      doc.name,
      doc.manager,
      doc.location,
      doc.teams ? doc.teams.map((t:any) => new TeamEntity(t._id.toString(), t.name, t.members)) : [],
      doc.createdAt,
      doc.updatedAt,
    );
  }
    static toEntities(docs: any[]): DepartmentEntity[] {
    return docs.map((doc) => this.toEntity(doc));
  }
}
