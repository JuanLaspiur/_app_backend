import { PaymentEntity } from "../../domain";

export class PaymentMapper {
    static toEntity(paymentDoc: any): PaymentEntity {
        if (!paymentDoc) return null as any;

        return new PaymentEntity(
            paymentDoc.id,
            paymentDoc.userId,
            paymentDoc.amount,
            paymentDoc.method,
            paymentDoc.date,
            paymentDoc.status,
            paymentDoc.description,
           
        );
    }

    static toEntities(paymentDocs: any[]): PaymentEntity[] {
        return paymentDocs.map((doc) => this.toEntity(doc));
    }
}