import { TeamModel } from "../../../data/mogodb";

export class GetAll {
 static async execute() {
    return TeamModel.find();
  }
}