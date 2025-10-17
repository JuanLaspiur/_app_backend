export interface OpenLogProps {
  logId: string;
  entryToken: string;
}

export class OpenLogDto {
    constructor(
        public readonly logId: string,
        public readonly entryToken: string
    ) {}

    static create(props: OpenLogProps | any): [string?, OpenLogDto?] {
        if (!props) {
            return ["Props not provided", undefined];
        }

        const { logId, entryToken } = props as OpenLogProps;

        if (!logId || typeof logId !== "string") {
            return ["logId is missing or invalid", undefined];
        }

        if (!entryToken || typeof entryToken !== "string") {
            return ["entryToken is missing or invalid", undefined];
        }

        const dto = new OpenLogDto(logId, entryToken);
        return [undefined, dto];
    }
}
