import { PaymentModel } from "../../../data/mogodb";

export class GetAllPaymentsUseCase {
  async execute() {
    return await PaymentModel.find()
      .populate({ path: "userId", select: "-session" })
      .sort({ date: -1 });
  }
}
