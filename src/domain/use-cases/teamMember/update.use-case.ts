import { TeamMember } from "../../../../types/teamMember";
import { TeamMemberModel } from "../../../data/mogodb/";

export class UpdateTeamMemberUseCase {
  async execute(id: string, updates: Partial<TeamMember>) {
    return TeamMemberModel.findByIdAndUpdate(id, updates, { new: true });
  }
}
