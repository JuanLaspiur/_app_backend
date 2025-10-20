import { TeamDataSource, TeamEntity, TeamRepository } from "../../domain";
import { CreateTeamDto, jwtDto, UpdateTeamDto } from "../../domain/dtos";

export class TeamRepositoryImpl implements TeamRepository {
    constructor(private readonly dataSource: TeamDataSource) { }
    createTeam(dto: jwtDto, createTeamDto: CreateTeamDto): Promise<TeamEntity> {
        return this.dataSource.createTeam(dto, createTeamDto);
    }
    getAllTeams(dto: jwtDto): Promise<TeamEntity[]> {
        return this.dataSource.getAllTeams(dto);
    }
    updateTeam(dto: jwtDto, updateTeamDto: UpdateTeamDto): Promise<TeamEntity | null> {
        return this.dataSource.updateTeam(dto, updateTeamDto);
    }
    deleteTeam(dto: jwtDto, teamId: string): Promise<boolean> {
       return this.dataSource.deleteTeam(dto, teamId);
    }


}