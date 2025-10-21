import { TeamDataSource, TeamEntity } from "../../domain";
import { jwtDto, CreateTeamDto, UpdateTeamDto } from "../../domain/dtos";
import { TeamMapper } from "../mappers/team.mapper";
import { TeamModel, DepartmentModel } from "../../data/mogodb"; 
import { CustomError } from "../../domain";

export class TeamDataSourceImpl implements TeamDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }

  async createTeam(dto: jwtDto, createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    try {
      this.verifyToken(dto);
      const { departmentId, ...createDto } = createTeamDto;

      const department = await DepartmentModel.findById(departmentId);
      if (!department) throw CustomError.notFound("Department not found");

      const teamDoc = await TeamModel.create({
        ...createDto,
      });

      department.teams.push(teamDoc);
      await department.save();

      const populatedTeam = await teamDoc.populate({
        path: "members",
        select: "-password -session",
      });

      if (!populatedTeam) throw CustomError.notFound("Team not found after creation");

      return TeamMapper.toEntity(populatedTeam);
    } catch (error) {
      this.handleError(error);
    }
  }


  async getAllTeams(dto: jwtDto): Promise<TeamEntity[]> {
    try {
      this.verifyToken(dto);
      const docs = await TeamModel.find().populate({
        path: "members",
        select: "-password -session",
      });
      return TeamMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateTeam(dto: jwtDto, updateTeamDto: UpdateTeamDto): Promise<TeamEntity | null> {
    try {
      this.verifyToken(dto);

      const doc = await TeamModel.findByIdAndUpdate(updateTeamDto.id, updateTeamDto, { new: true }).populate({
        path: "members",
        select: "-password -session",
      });
;
      return doc ? TeamMapper.toEntity(doc) : null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTeam(dto: jwtDto, teamId: string): Promise<boolean> {
    try {
      this.verifyToken(dto);

      const result = await TeamModel.findByIdAndDelete(teamId);
      return !!result;
    } catch (error) {
      this.handleError(error);
    }
  }
}