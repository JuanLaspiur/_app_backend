import { TeamMemberModel } from "../../../data/mogodb/";

export class GetUserTeamMemberUseCase {
  async execute(userId: string) {
    return TeamMemberModel.findOne({ userId });
  }
}