import { UserModel } from "../../../data/mogodb";

export class GetUserByIdUseCase {
  static async execute(userId: string) {
    return UserModel.findById(userId);
  }
}
