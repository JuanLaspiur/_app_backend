export class NoteEntity {
    constructor(
        public readonly id : string,
        public readonly title : string,
        public readonly content : string,
        public readonly userId : string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ){}

}