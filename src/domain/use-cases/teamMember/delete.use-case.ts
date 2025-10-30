import { TeamMemberModel } from "../../../data/mogodb/";

export class DeleteTeamMemberUseCase {
  async execute(id: string) {
    const result = await TeamMemberModel.findByIdAndDelete(id);
    return !!result;
  }
}
