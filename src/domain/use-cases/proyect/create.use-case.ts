import { ProyectModel } from "../../../data/mogodb";
import { CreateProyectDto } from "../../dtos";

export class Create {
 static async execute(createProyectDto: CreateProyectDto) {
    const payment = await ProyectModel.create(createProyectDto);
    return payment;
  }
}
