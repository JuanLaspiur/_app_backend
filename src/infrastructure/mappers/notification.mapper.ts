import { NotificationEntity } from "../../domain";
import { NotificationModel } from "../../data/mogodb";

export class NotificationMapper {


  static toEntity(doc: typeof NotificationModel | any): NotificationEntity {
    return new NotificationEntity(
      doc.id || doc._id.toString(),
      doc.userId,
      doc.title,
      doc.isRead,
      doc.message,
      doc.createdAt,
      doc.type
    );
  }

  static toEntities(docs: Array<typeof NotificationModel | any>): NotificationEntity[] {
    return docs.map((doc) => this.toEntity(doc));
  }
}
