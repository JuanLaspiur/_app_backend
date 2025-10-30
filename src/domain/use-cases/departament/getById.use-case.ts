import { DepartmentModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class GetById {
static  async execute(departmentId: string) {
    const department = await DepartmentModel.findById(departmentId);
    if (!department) throw CustomError.notFound("Department not found");
    return department;
  }
}


