import { PaymentDataSource, PaymentEntity, GeneratePaymentPdfUseCase, SendSalaryNotificationUseCase } from "../../domain";
import { jwtDto, CreatePaymentDto } from "../../domain/dtos";
import { PaymentMapper } from "../mappers/payment.mapper";
import { PaymentModel } from "../../data/mogodb";


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
      const entity = PaymentMapper.toEntity(payment);
      GeneratePaymentPdfUseCase.execute(entity);
      const userEmail = typeof entity.userId === "object" ? entity.userId.email : null;
      if (userEmail)
      await SendSalaryNotificationUseCase.execute(userEmail, entity.amount, entity.date);
      return entity;
    } catch (error) {
      this.handleError(error);
    }
  }


  async getAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
    try {
      this.verifyToken(dto);
      const payments = await PaymentModel.find().populate({ path: 'userId', select: "-session" }).sort({ date: -1 });
      return PaymentMapper.toEntities(payments);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOunAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
    try {
      const userId = this.verifyToken(dto);
      const payments = await PaymentModel.find({ userId }).sort({ date: -1 });;
      return PaymentMapper.toEntities(payments);
    } catch (error) {
      this.handleError(error);
    }
  }
}
