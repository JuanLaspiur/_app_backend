import { ProyectModel, TeamModel } from "../../../data/mogodb";
import { CreateProyectDto } from "../../dtos";

export class Create {
  static async execute(createProyectDto: CreateProyectDto) {
    const proyect = await ProyectModel.create(createProyectDto);

    await TeamModel.findByIdAndUpdate(
      proyect.teamId,
      { $addToSet: { projects: proyect.id } }, 
      { new: true }
    );

    return proyect;
  }
}
