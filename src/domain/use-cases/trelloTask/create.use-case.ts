import { TrelloTaskModel } from "../../../data/mogodb/";
import { CreateTrelloTaskDto } from "../../dtos";

export class Create {
 static async execute(createDto: CreateTrelloTaskDto) {
    return TrelloTaskModel.create(createDto);
  }
}