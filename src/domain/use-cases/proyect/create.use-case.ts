import { ProyectModel, TeamModel, TrelloBoardModel } from "../../../data/mogodb";
import { CreateProyectDto } from "../../dtos";

export class Create {
  static async execute(createProyectDto: CreateProyectDto) {
    const proyect = await ProyectModel.create(createProyectDto);

    await TeamModel.findByIdAndUpdate(
      proyect.teamId,
      { $addToSet: { projects: proyect.id } },
      { new: true }
    );

    const trelloBoard = await TrelloBoardModel.create({
      projectId: proyect.id,
      teamId: proyect.teamId,
    });

    proyect.trelloBoardId = trelloBoard.id;
    await proyect.save();

    return proyect;
  }
}
