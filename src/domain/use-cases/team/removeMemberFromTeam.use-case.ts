import { TeamModel } from "../../../data/mogodb";
import { RemoveMemberDto } from "../../dtos";

export class RemoveMember {
 static async execute(removeMemberDto: RemoveMemberDto) {
    const { teamId, teamMemberId } = removeMemberDto;
    return TeamModel.findByIdAndUpdate(
      teamId,
      { $pull: { members: teamMemberId } },
      { new: true }
    );
  }
}