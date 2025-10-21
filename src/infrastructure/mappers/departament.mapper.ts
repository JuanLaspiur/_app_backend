import { DepartmentEntity, TeamEntity } from "../../domain";
import { UserMapper } from "./user.mapper"; 

export class DepartamentMapper {
  static toEntity(doc: any): DepartmentEntity {
    return new DepartmentEntity(
      doc._id.toString(),
      doc.name,
      doc.manager,
      doc.location,
      doc.teams
        ? doc.teams.map(
            (t: any) => new TeamEntity(t._id.toString(), t.name, t.members)
          )
        : [],
      doc.createdAt,
      doc.updatedAt
    );
  }

  static toEntities(docs: any[]): DepartmentEntity[] {
    return docs.map((doc) => this.toEntity(doc));
  }

  static toEntityWithManagerPopulate(doc: any): DepartmentEntity {
    const manager =
      doc.manager && typeof doc.manager === "object"
        ? UserMapper.userEntityFromObject(doc.manager) 
        : doc.manager;

    return new DepartmentEntity(
      doc._id.toString(),
      doc.name,
      manager,
      doc.location,
      doc.teams
        ? doc.teams.map(
            (t: any) => new TeamEntity(t._id.toString(), t.name, t.members)
          )
        : [],
      doc.createdAt,
      doc.updatedAt
    );
  }

  static toEntitiesWithManagerPopulate(docs: any[]): DepartmentEntity[] {
    return docs.map((doc) => this.toEntityWithManagerPopulate(doc));
  }
}
