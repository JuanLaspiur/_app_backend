import { DepartmentModel } from "../../../data/mogodb";

export class Delete {
  static async execute(departmentId: string): Promise<boolean> {
    const res = await DepartmentModel.findByIdAndDelete(departmentId);
    return !!res;
  }
}