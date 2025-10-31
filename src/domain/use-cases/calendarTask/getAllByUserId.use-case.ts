import { CalendarTaskModel, DepartmentModel } from "../../../data/mogodb";

export class GetAllByUserId {
    static async execute(userId:string) {
        return await CalendarTaskModel.find({ userId })
                        .sort({ date: 1 })
                        .lean();

    }
}
