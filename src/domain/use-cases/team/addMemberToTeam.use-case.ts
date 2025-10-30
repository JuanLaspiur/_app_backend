import { TeamModel, TeamMemberModel } from "../../../data/mogodb";
import { AddMemberDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class AddMemberToTeamUseCase {
  async execute(addMemberDto: AddMemberDto) {
    const { teamId, teamMemberId } = addMemberDto;

    const member = await TeamMemberModel.findById(teamMemberId);
    if (!member) throw CustomError.notFound("TeamMember not found");

    return TeamModel.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: teamMemberId } },
      { new: true }
    );
  }
}