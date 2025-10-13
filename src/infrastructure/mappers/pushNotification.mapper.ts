import { PushNotificationEntity } from "../../domain";

export class PushNotificationMapper {
  
  static toEntity(doc: any): PushNotificationEntity {
    if (!doc) throw new Error("PushNotificationMapper.toEntity: document is null or undefined");

    return new PushNotificationEntity(
      doc.id?.toString() || doc._id?.toString(),
      doc.userId,
      doc.token,
      doc.platform,
      doc.createdAt,
      doc.updatedAt
    );
  }

  static toEntities(docs: any[]): PushNotificationEntity[] {
    if (!Array.isArray(docs)) throw new Error("PushNotificationMapper.toEntities: expected an array");
    return docs.map((doc) => this.toEntity(doc));
  }
}
