import { DepartmentModel } from "../../../data/mogodb";
import { UpdateDepartmentDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class Update {
  static async execute(dto: UpdateDepartmentDto) {
    const doc = await DepartmentModel.findByIdAndUpdate(dto.id, dto, { new: true });
    if (!doc) throw CustomError.notFound(`Department with id ${dto.id} not found`);

    return {
      id: doc._id.toString(),
      name: doc.name,
      manager: doc.manager,
      teams: doc.teams,
      createdAt: doc.createdAt,
    };
  }
}