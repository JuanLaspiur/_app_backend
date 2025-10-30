import { TeamModel } from "../../../data/mogodb";
import { CreateTeamDto } from "../../dtos";

export class CreateTeamUseCase {
  async execute(createTeamDto: CreateTeamDto) {
    const { departmentId, ...teamData } = createTeamDto;
    return await TeamModel.create({ ...teamData });
  }
}
