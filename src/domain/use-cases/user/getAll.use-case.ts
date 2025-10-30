import { UserModel } from "../../../data/mogodb";

export class GetAllUsersUseCase {
static  async execute() {
    return UserModel.find();
  }
}