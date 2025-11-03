import { CustomError, TeamMemberDataSource, TeamMemberEntity } from "../../domain";
import { TeamMemberMapper } from "../mappers/teamMember.mapper";
import { CreateTeamMemberDto, jwtDto, UpdateTeamMemberDto } from "../../domain/dtos";
import { UpdateUserById } from "../../domain/use-cases/user";
import * as teamMemberUseCases from "../../domain/use-cases/teamMember";

export class TeamMemberDataSourceImpl implements TeamMemberDataSource {
    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) { }

    private authorize(dto: jwtDto) {
        const userId = this.verifyToken(dto);
        if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
        return userId;
    }


    async createTeamMember(dto: jwtDto, createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMemberEntity> {
        try {
            this.authorize(dto);
            const teamMember = await teamMemberUseCases.Create.execute(createTeamMemberDto);
            if (teamMember.userId) {
                await UpdateUserById.execute(createTeamMemberDto.userId, { teamMember: teamMember.id, isActive:true });
            }
            return TeamMemberMapper.toEntity(teamMember);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUserTeamMember(dto: jwtDto): Promise<TeamMemberEntity | null> {
        try {
            const userId = this.authorize(dto);
            const teamMember = await teamMemberUseCases.GetOneByUserId.execute(userId);
            return TeamMemberMapper.toEntity(teamMember);
        } catch (error) {
            this.handleError(error);
        }
    }
    async updateTeamMember(dto: jwtDto, updatesDto: UpdateTeamMemberDto): Promise<TeamMemberEntity | null> {
        try {
            this.authorize(dto);
            const updated = await teamMemberUseCases.Update.execute(updatesDto.id, updatesDto);
            return TeamMemberMapper.toEntity(updated);
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteTeamMember(dto: jwtDto, teamMemberId: string): Promise<boolean> {
        try {
            this.authorize(dto);
            return !! await teamMemberUseCases.Delete.execute(teamMemberId);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAllTeamMembers(dto: jwtDto): Promise<TeamMemberEntity[]> {
        try {
           this.authorize(dto);
            const teamMembers = await teamMemberUseCases.GetAll.execute();
            return TeamMemberMapper.toEntities(teamMembers);
        } catch (error) {
            this.handleError(error);
        }
    }
}