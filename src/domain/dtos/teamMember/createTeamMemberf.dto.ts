export class CreateTeamMemberDto {
  constructor(
    public readonly userId: string,
    public readonly position: string,
    public readonly roleLevel: string,
    public readonly salary: number,
    public readonly jobDescription?: string,
    public readonly startDate: Date = new Date()
  ) {}

  static create(object: any): [string?, CreateTeamMemberDto?] {
    if (!object) return ["No object provided"];

    const { userId, position, roleLevel, salary, jobDescription, startDate } = object;

    if (!userId || typeof userId !== "string") {
      return ["The 'userId' field is required and must be a string"];
    }

    if (!position || typeof position !== "string") {
      return ["The 'position' field is required and must be a string"];
    }

    if (!roleLevel || typeof roleLevel !== "string") {
      return ["The 'roleLevel' field is required and must be a string"];
    }

    if (salary == null || typeof salary !== "number") {
      return ["The 'salary' field is required and must be a number"];
    }

    if (jobDescription && typeof jobDescription !== "string") {
      return ["The 'jobDescription' field must be a string"];
    }

    let startDateObj: Date;
    if (startDate) {
      startDateObj = new Date(startDate);
      if (isNaN(startDateObj.getTime())) return ["Invalid 'startDate'"];
    } else {
      startDateObj = new Date();
    }

    return [
      undefined,
      new CreateTeamMemberDto(userId, position, roleLevel, salary, jobDescription, startDateObj)
    ];
  }
}
