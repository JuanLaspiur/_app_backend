import { TeamMemberEntity } from "../../domain";

export class TeamMemberMapper {
    static toEntity(doc: any): TeamMemberEntity {
        if (!doc) return null as any;

        return new TeamMemberEntity(
            doc.id || doc._id?.toString(),
            doc.userId,
            doc.position,
            doc.roleLevel,
            doc.salary,
            doc.jobDescription,
            doc.startDate ? new Date(doc.startDate) : new Date(),
            doc.createdAt ? new Date(doc.createdAt) : new Date(),
            doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        );

    }

    static toEntities(docs: any[]): TeamMemberEntity[] {
        if (!Array.isArray(docs)) return [];
        return docs.map((doc) => this.toEntity(doc));
    }
}
