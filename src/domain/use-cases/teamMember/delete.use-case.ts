import { TeamMemberModel, UserModel, WorkScheduleModel } from "../../../data/mogodb";

export class Delete {
  static async execute(id: string) {
    const deletedTeamMember = await TeamMemberModel.findByIdAndDelete(id);
    if (!deletedTeamMember) return null;

    const userId = deletedTeamMember.userId;
    if (userId) {
      await UserModel.findByIdAndUpdate(userId, {
        teamMember: null,
        isActive: false,
      });

      await WorkScheduleModel.updateMany(
        { userId },
        {
          startTime: "1970-01-01T00:00:00.000Z",
          endTime: "1970-01-01T00:00:00.000Z",
          isWorkday: false,
        }
      );
    }

    return deletedTeamMember;
  }
}
