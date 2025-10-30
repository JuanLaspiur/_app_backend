import { UserModel } from "../../../data/mogodb";

export class GetAllActiveUsersUseCase {
  async execute() {
    return UserModel.find({ isActive: true });
  }
}