import { Team } from "../../../../types/team";
import { TeamModel } from "../../../data/mogodb";

export class UpdateTeamUseCase {
  async execute(id: string, updateData: Partial<Team>) {
    
    return TeamModel.findByIdAndUpdate(id, updateData, { new: true });
  }
}