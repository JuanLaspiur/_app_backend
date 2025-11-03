import { ProyectModel } from "../../../data/mogodb";
import { UpdateProyectDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class Update {
  static async execute(updateData: UpdateProyectDto) {
    const {id, ...data} = updateData;
    const updatedProyect = await ProyectModel.findByIdAndUpdate(
      id,
      data,
      { new: true } 
    );

    if (!updatedProyect) throw CustomError.notFound("Project not found or bad request update Proyect");

    return updatedProyect;
  }
}
