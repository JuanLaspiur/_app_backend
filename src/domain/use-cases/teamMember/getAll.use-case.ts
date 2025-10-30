import { TeamMemberModel } from "../../../data/mogodb/";

export class GetAllTeamMembersUseCase {
  async execute() {
    return TeamMemberModel.find().populate({ path: "userId", select: "-password -session" });
  }
}