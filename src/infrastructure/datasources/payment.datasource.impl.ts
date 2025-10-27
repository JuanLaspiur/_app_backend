import { PaymentDataSource, PaymentEntity } from "../../domain";
import { jwtDto, CreatePaymentDto } from "../../domain/dtos";
import { PaymentMapper } from "../mappers/payment.mapper";
import { PaymentModel } from "../../data/mogodb";
import { PdfPaymentService } from "../services/pdf.payment.service";

export class PaymentDataSourceImpl implements PaymentDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {

  }

  async createPayment(dto: jwtDto, createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    try {
      this.verifyToken(dto);
      const payment = await PaymentModel.create(createPaymentDto);
      const pdfService = new PdfPaymentService();
      const entity = PaymentMapper.toEntity(payment);
      const paymentInfo = {
        invoiceNumber: payment.id,
        invoiceDate: payment.date,
        userName: `${typeof entity.userId === "object" && entity.userId.firstName} ${typeof entity.userId === "object" &&  entity.userId.lastName}`,
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
      return entity;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
    try {
      this.verifyToken(dto);
      const payments = await PaymentModel.find();
      return PaymentMapper.toEntities(payments);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOunAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
    try {
      const userId = this.verifyToken(dto); // devuelve userId
      const payments = await PaymentModel.find({ userId });
      return PaymentMapper.toEntities(payments);
    } catch (error) {
      this.handleError(error);
    }
  }
}
