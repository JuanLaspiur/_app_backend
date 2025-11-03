import { ProyectModel } from "../../../data/mogodb";

export class GetAll {
  static async execute() {
    return await ProyectModel.find()
      .sort({ createdAt: -1 }); 
  }
}
