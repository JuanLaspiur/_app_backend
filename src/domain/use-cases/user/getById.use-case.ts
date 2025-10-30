import { UserModel } from "../../../data/mogodb";

export class GetUserByIdUseCase {
  async execute(userId: string) {
    return UserModel.findById(userId);
  }
}
