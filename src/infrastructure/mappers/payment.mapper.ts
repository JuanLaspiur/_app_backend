import { PaymentEntity } from "../../domain";

export class PaymentMapper {
    static toEntity(paymentDoc: any): PaymentEntity {
        if (!paymentDoc) return null as any;

        return new PaymentEntity(
            paymentDoc.id,
            paymentDoc.userId,
            paymentDoc.amount,
            paymentDoc.method,
            paymentDoc.status,
            paymentDoc.description,
            paymentDoc.date
        );
    }

    static toEntities(paymentDocs: any[]): PaymentEntity[] {
        return paymentDocs.map((doc) => this.toEntity(doc));
    }
}