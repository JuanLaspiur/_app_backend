import { TeamMemberDataSource, TeamMemberEntity, TeamMemberRepository } from "../../domain";
import { jwtDto, CreateTeamMemberDto, UpdateTeamMemberDto } from "../../domain/dtos";

export class TeamMemberRepositoryImpl implements TeamMemberRepository {

    constructor(private readonly dataSource: TeamMemberDataSource) { }

    createTeamMember(dto: jwtDto, createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMemberEntity> {
        return this.dataSource.createTeamMember(dto, createTeamMemberDto);
    }
    getUserTeamMember(dto: jwtDto): Promise<TeamMemberEntity | null> {
        return this.dataSource.getUserTeamMember(dto);
    }
    updateTeamMember(dto: jwtDto, updatesDto: UpdateTeamMemberDto): Promise<TeamMemberEntity | null> {
        return this.dataSource.updateTeamMember(dto, updatesDto);
    }
    deleteTeamMember(dto: jwtDto, teamMemberId: string): Promise<boolean> {
        return this.dataSource.deleteTeamMember(dto, teamMemberId);
    }
    getAllTeamMembers(dto: jwtDto): Promise<TeamMemberEntity[]> {
        return this.dataSource.getAllTeamMembers(dto);
    }

}