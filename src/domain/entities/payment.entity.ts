import { User } from "../../../types/user";

export class PaymentEntity{
    constructor(
        public readonly id: string,
        public readonly userId: string | User,
        public readonly amount: number,
        public readonly method: string, 
        public readonly date : Date,
        public readonly status: string,
        public readonly description? :string   

    ){}
}