import { CustomError, TeamDataSource, TeamEntity } from "../../domain";
import { jwtDto, CreateTeamDto, UpdateTeamDto, AddMemberDto, RemoveMemberDto } from "../../domain/dtos";
import { TeamMapper } from "../mappers/team.mapper";
import * as TeamUseCases from '../../domain/use-cases/team';
import * as DepartamentUseCases from '../../domain/use-cases/departament';

export class TeamDataSourceImpl implements TeamDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }

    private authorize(dto: jwtDto) {
        const userId = this.verifyToken(dto);
        if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
        return userId;
    }

  async createTeam(dto: jwtDto, createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    try {
      this.authorize(dto);

      const departamentUseCase = new DepartamentUseCases.GetDepartmentByIdUseCase()
      const department = await departamentUseCase.execute(createTeamDto.departmentId);

      const teamUseCase = new TeamUseCases.CreateTeamUseCase()
      const team = await teamUseCase.execute(createTeamDto);

      department.teams.push(team.id);
      await department.save();

      return TeamMapper.toEntity(team);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllTeams(dto: jwtDto): Promise<TeamEntity[]> {
    try {
      this.authorize(dto);

      const teamUseCase = new TeamUseCases.GetAllTeamsUseCase()
      const teams = await teamUseCase.execute();

      return TeamMapper.toEntities(teams);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateTeam(dto: jwtDto, updateTeamDto: UpdateTeamDto): Promise<TeamEntity | null> {
    try {
      this.authorize(dto);

      const teamUseCase = new TeamUseCases.UpdateTeamUseCase()
      const team = await teamUseCase.execute(updateTeamDto.id, updateTeamDto);

      return team ? TeamMapper.toEntity(team) : null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTeam(dto: jwtDto, teamId: string): Promise<boolean> {
    try {
      this.authorize(dto);

      const teamUseCase = new TeamUseCases.DeleteTeamUseCase()
      const team = await teamUseCase.execute(teamId);
      
      return !!team;
    } catch (error) {
      this.handleError(error);
    }
  }

  async addMember(dto: jwtDto, addMemberDto: AddMemberDto): Promise<TeamEntity | null> {
    try {
      this.authorize(dto);

      const teamUseCase = new TeamUseCases.AddMemberToTeamUseCase()
      const team = await teamUseCase.execute(addMemberDto);

      return team ? TeamMapper.toEntity(team) : null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async removeMember(dto: jwtDto, removeMemberDto: RemoveMemberDto): Promise<TeamEntity | null> {
    try {
      this.authorize(dto);

      const teamUseCase = new TeamUseCases.RemoveMemberFromTeamUseCase()
      const team = await teamUseCase.execute(removeMemberDto);

      return team ? TeamMapper.toEntity(team) : null;
    } catch (error) {
      this.handleError(error);
    }
  }

}
