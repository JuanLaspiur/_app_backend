import { PaymentDataSource, PaymentEntity, GeneratePaymentPdfUseCase, SendSalaryNotificationUseCase, CustomError,} from "../../domain";
import { jwtDto, CreatePaymentDto } from "../../domain/dtos";
import { PaymentMapper } from "../mappers/payment.mapper";
import * as PaymentUseCases from "../../domain/use-cases/payment";

export class PaymentDataSourceImpl implements PaymentDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}


   private authorize(dto: jwtDto) {
          const userId = this.verifyToken(dto);
          if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
          return userId;
      }

      
  async createPayment(dto: jwtDto, createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    try {
      this.authorize(dto);

      const payment = await PaymentUseCases.Create.execute(createPaymentDto);
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
      this.authorize(dto);

      const payments = await PaymentUseCases.GetAll.execute();

      return PaymentMapper.toEntities(payments);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOunAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
    try {
      const userId = this.authorize(dto);
      const payments = await PaymentUseCases.GetAllByUserId.execute(userId);
      return PaymentMapper.toEntities(payments);
    } catch (error) {
      this.handleError(error);
    }
  }
}
