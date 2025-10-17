export interface CloseLogProps {
  logId: string;
  entryToken: string;
}

export class CloseLogDto {
    constructor(
        public readonly logId: string,
        public readonly entryToken: string
    ) {}

    static create(props: CloseLogProps | any): [string?, CloseLogDto?] {
        if (!props) {
            return ["Props not provided", undefined];
        }

        const { logId, entryToken } = props as CloseLogProps;

        if (!logId || typeof logId !== "string") {
            return ["logId is missing or invalid", undefined];
        }

        if (!entryToken || typeof entryToken !== "string") {
            return ["entryToken is missing or invalid", undefined];
        }

        const dto = new CloseLogDto(logId, entryToken);
        return [undefined, dto];
    }
}
