import { TeamMember } from "./teamMember";

export type Team = {
  id: string;
  name: string;
  members?: string[] | TeamMember[]; // o algún otro tipo genérico para miembros
  createdAt?: Date;
  updatedAt?: Date;
};
