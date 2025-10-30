import { TeamModel } from "../../../data/mogodb";

export class GetAllTeamsUseCase {
  async execute() {
    return TeamModel.find();
  }
}