import { User } from "./user";

export type TeamMember = {
  id: string;
  userId: string | User;
  position: string;
  roleLevel: string;
  salary: number;
  jobDescription?: string;
  startDate: Date;
};
