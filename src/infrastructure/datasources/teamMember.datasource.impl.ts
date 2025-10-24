import { TeamMemberDataSource, TeamMemberEntity } from "../../domain";
import { TeamMemberMapper } from "../mappers/teamMember.mapper";
import { CreateTeamMemberDto, jwtDto, UpdateTeamMemberDto } from "../../domain/dtos";
import { TeamMemberModel, UserModel } from "../../data/mogodb/";

export class TeamMemberDataSourceImpl implements TeamMemberDataSource {
    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) { }


    async createTeamMember(dto: jwtDto, createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMemberEntity> {
        try {
            this.verifyToken(dto);
            if (createTeamMemberDto.userId) {
                const existingTeamMember = await TeamMemberModel.findOne({ userId: createTeamMemberDto.userId });
                if (existingTeamMember) {
                    await TeamMemberModel.findByIdAndDelete(existingTeamMember._id);
                }
            }
            const teamMember = await TeamMemberModel.create(createTeamMemberDto);
            if (createTeamMemberDto.userId) {
                await UserModel.findByIdAndUpdate(
                    createTeamMemberDto.userId,
                    { teamMember: teamMember._id },
                    { new: true }
                );
            }
            return TeamMemberMapper.toEntity(teamMember);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUserTeamMember(dto: jwtDto): Promise<TeamMemberEntity | null> {
        try {
            const userId = this.verifyToken(dto);
            const teamMember = await TeamMemberModel.find({ userId });
            return TeamMemberMapper.toEntity(teamMember);
        } catch (error) {
            this.handleError(error);
        }
    }
    async updateTeamMember(dto: jwtDto, updatesDto: UpdateTeamMemberDto): Promise<TeamMemberEntity | null> {
        try {
            this.verifyToken(dto);

            const doc = await TeamMemberModel.findByIdAndUpdate(
                updatesDto.id,
                updatesDto,
                { new: true }
            );

            return TeamMemberMapper.toEntity(doc);
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteTeamMember(dto: jwtDto, teamMemberId: string): Promise<boolean> {
        try {
            this.verifyToken(dto);
            const result = await TeamMemberModel.findByIdAndDelete(teamMemberId);
            return !!result;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAllTeamMembers(dto: jwtDto): Promise<TeamMemberEntity[]> {
        try {
            this.verifyToken(dto);
            const docs = await TeamMemberModel.find().populate({path:"userId", select:'-password -session'});
            return TeamMemberMapper.toEntities(docs);
        } catch (error) {
            this.handleError(error);
        }
    }
}