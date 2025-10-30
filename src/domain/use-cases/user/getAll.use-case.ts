import { UserModel } from "../../../data/mogodb";

export class GetAllUsers {
static  async execute() {
    return UserModel.find();
  }
}