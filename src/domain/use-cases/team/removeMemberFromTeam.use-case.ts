import { TeamModel } from "../../../data/mogodb";
import { RemoveMemberDto } from "../../dtos";

export class RemoveMemberFromTeamUseCase {
  async execute(removeMemberDto: RemoveMemberDto) {
    const { teamId, teamMemberId } = removeMemberDto;
    return TeamModel.findByIdAndUpdate(
      teamId,
      { $pull: { members: teamMemberId } },
      { new: true }
    );
  }
}