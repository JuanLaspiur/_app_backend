import { UserModel } from "../../../data/mogodb";

export class GetUserById {
  static async execute(userId: string) {
    return UserModel.findById(userId);
  }
}
