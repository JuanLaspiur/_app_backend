import { PaymentModel } from "../../../data/mogodb";
import { CreatePaymentDto } from "../../dtos";

export class Create {
 static async execute(createPaymentDto: CreatePaymentDto) {
    const payment = await PaymentModel.create(createPaymentDto);
    return payment;
  }
}
