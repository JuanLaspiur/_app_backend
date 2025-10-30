import { TeamModel } from "../../../data/mogodb";

export class DeleteTeamUseCase {
  async execute(id: string) {
    const result = await TeamModel.findByIdAndDelete(id);
    return !!result;
  }
}