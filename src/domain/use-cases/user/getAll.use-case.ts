import { UserModel } from "../../../data/mogodb";

export class GetAllUsersUseCase {
  async execute() {
    return UserModel.find();
  }
}