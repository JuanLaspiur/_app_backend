import { PaymentDataSource, PaymentEntity, PaymentRepository } from "../../domain";
import { jwtDto, CreatePaymentDto } from "../../domain/dtos";

export class PaymentRepositoryImpl implements PaymentRepository {

    constructor(private readonly dataSource: PaymentDataSource) { }
    createPayment(dto: jwtDto, createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        return this.dataSource.createPayment(dto, createPaymentDto);
    }
    getAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
        return this.dataSource.getAllPayment(dto);
    }
    getOunAllPayment(dto: jwtDto): Promise<PaymentEntity[]> {
        return this.dataSource.getOunAllPayment(dto);
    }

}