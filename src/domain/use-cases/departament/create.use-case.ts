import { DepartmentModel } from "../../../data/mogodb";
import { CreateDepartmentDto } from "../../dtos";

export class Create {
  static async execute(dto: CreateDepartmentDto) {
    return await DepartmentModel.create({ ...dto });
  }
}
