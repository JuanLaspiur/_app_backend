import { TeamMemberModel } from "../../../data/mogodb/";
import { CreateTeamMemberDto } from "../../dtos";

export class CreateTeamMember {
 static async execute(createDto: CreateTeamMemberDto) {
    if (createDto.userId) {
      const existing = await TeamMemberModel.findOne({ userId: createDto.userId });
      if (existing) await TeamMemberModel.findByIdAndDelete(existing.id);
    }
    return TeamMemberModel.create(createDto);
  }
}