import { PaymentModel } from "../../../data/mogodb";

export class GetUserPaymentsUseCase {
  async execute(userId: string) {
    return await PaymentModel.find({ userId }).sort({ date: -1 });
  }
}
