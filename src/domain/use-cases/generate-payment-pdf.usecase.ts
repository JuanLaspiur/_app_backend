import { PdfPaymentService } from "../../infrastructure/services/pdf.payment.service";
import { PaymentEntity } from "../../domain/entities/payment.entity";

export interface PaymentInfo {
  invoiceNumber: string;
  invoiceDate: Date;
  userName: string;
  amount: number;
  method: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export class GeneratePaymentPdfUseCase {
static execute(payment: PaymentEntity): void {
  const pdfService = new PdfPaymentService();
  const paymentDate = payment.date instanceof Date ? payment.date : new Date(payment.date);

  const paymentInfo: PaymentInfo = {
    invoiceNumber: payment.id,
    invoiceDate: paymentDate,
    userName: `${typeof payment.userId === "object" ? payment.userId.firstName : ""} ${typeof payment.userId === "object" ? payment.userId.lastName : ""}`,
    amount: payment.amount,
    method: payment.method,
    items: [
      {
        description: payment.description || "Pago",
        quantity: 1,
        unitPrice: payment.amount,
        total: payment.amount,
      },
    ],
  };

  pdfService.generateInvoice(paymentInfo);
}

}
