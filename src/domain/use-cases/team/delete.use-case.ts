import { TeamModel } from "../../../data/mogodb";

export class Delete {
 static async execute(id: string) {
    const result = await TeamModel.findByIdAndDelete(id);
    return !!result;
  }
}