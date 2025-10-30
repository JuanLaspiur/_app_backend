import { TeamMemberModel } from "../../../data/mogodb/";

export class GetOneByUserId {
 static async execute(userId: string) {
    return TeamMemberModel.findOne({ userId });
  }
}