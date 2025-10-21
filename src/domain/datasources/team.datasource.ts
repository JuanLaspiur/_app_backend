import { jwtDto, CreateTeamDto, UpdateTeamDto, RemoveMemberDto, AddMemberDto } from "../dtos";
import { TeamEntity } from "../entities/team.entity";

export abstract class TeamDataSource {
    abstract createTeam(dto: jwtDto, createTeamDto: CreateTeamDto): Promise<TeamEntity>;
    abstract getAllTeams(dto: jwtDto): Promise<TeamEntity[]>;
    abstract updateTeam(dto: jwtDto, updateTeamDto: UpdateTeamDto): Promise<TeamEntity | null>;
    abstract deleteTeam(dto: jwtDto, teamId: string): Promise<boolean>;
    abstract addMember(dto: jwtDto, addMemberDto: AddMemberDto): Promise<TeamEntity | null>;
    abstract removeMember(dto: jwtDto, removeMemberDto: RemoveMemberDto): Promise<TeamEntity | null>;
}
