import { DepartmentModel } from "../../../data/mogodb";

export class GetAll {
    static async execute() {
        return await DepartmentModel.find()
            .populate({ path: "manager", select: "-password -session" })
            .populate({ path: "teams" })
            .exec();

    }
}
