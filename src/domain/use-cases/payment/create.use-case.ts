import { PaymentModel } from "../../../data/mogodb";
import { CreatePaymentDto } from "../../dtos";

export class CreatePaymentUseCase {
  async execute(createPaymentDto: CreatePaymentDto) {
    const payment = await PaymentModel.create(createPaymentDto);
    return payment;
  }
}
