import { jwtDto, CreatePaymentDto } from "../dtos";
import { PaymentEntity } from "../entities/payment.entity";

export abstract class PaymentRepository {
    abstract createPayment(dto: jwtDto, createPaymentDto: CreatePaymentDto):Promise<PaymentEntity>;
    abstract getAllPayment(dto: jwtDto):Promise<PaymentEntity[]>;
    abstract getOunAllPayment(dto: jwtDto):Promise<PaymentEntity[]>;
    
}