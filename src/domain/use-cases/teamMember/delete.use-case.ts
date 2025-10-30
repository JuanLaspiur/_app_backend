import { TeamMemberModel } from "../../../data/mogodb/";

export class Delete {
  static async execute(id: string) {
    const result = await TeamMemberModel.findByIdAndDelete(id);
    return !!result;
  }
}
