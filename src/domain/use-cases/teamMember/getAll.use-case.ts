import { TeamMemberModel } from "../../../data/mogodb/";

export class GetAll {
 static async execute() {
    return TeamMemberModel.find().populate({ path: "userId", select: "-password -session" });
  }
}