import { PaymentModel } from "../../../data/mogodb";

export class GetAllByUserId{
 static async execute(userId: string) {
    return await PaymentModel.find({ userId }).sort({ date: -1 });
  }
}
