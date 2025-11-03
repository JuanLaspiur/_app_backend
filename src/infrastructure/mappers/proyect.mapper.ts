import { ProyectEntity } from "../../domain/entities/proyect.entity";

export class ProyectMapper {

  static toEntity(doc: any): ProyectEntity {
    if (!doc) return null as any;

    return new ProyectEntity(
      doc.id || doc._id.toString(),
      doc.teamId.toString(),
      doc.name,
      doc.description,
      doc.status,
      doc.startDate,
      doc.estimatedDeliveryDate,
      doc.endDate,
      doc.priority,
      doc.budget,
      doc.tags || [],
      doc.createdAt,
      doc.updatedAt
    );
  }

  /**
   * Convierte un array de documentos de ProyectModel a array de ProyectEntity
   */
  static toEntities(docs: any[]): ProyectEntity[] {
    return docs.map((doc) => ProyectMapper.toEntity(doc));
  }
}
