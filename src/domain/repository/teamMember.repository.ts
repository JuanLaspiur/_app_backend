import { TeamMemberEntity } from "../entities/teamMember.entity";
import { jwtDto, CreateTeamMemberDto, UpdateTeamMemberDto } from "../dtos";


export abstract class TeamMemberRepository {
    abstract createTeamMember(dto: jwtDto, createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMemberEntity>;
    abstract getUserTeamMember(dto: jwtDto): Promise<TeamMemberEntity | null>;
    abstract updateTeamMember(dto:jwtDto, updatesDto: UpdateTeamMemberDto): Promise<TeamMemberEntity | null>;
    abstract deleteTeamMember(dto:jwtDto, teamMemberId:string): Promise<boolean>;
    abstract getAllTeamMembers(dto: jwtDto): Promise<TeamMemberEntity[]>;
}
