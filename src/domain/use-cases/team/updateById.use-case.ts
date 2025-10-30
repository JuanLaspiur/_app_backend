import { Team } from "../../../../types/team";
import { TeamModel } from "../../../data/mogodb";

export class Update {
 static async execute(id: string, updateData: Partial<Team>) {
    
    return TeamModel.findByIdAndUpdate(id, updateData, { new: true });
  }
}