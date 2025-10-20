import { jwtDto, } from "../dtos";
import { TeamEntity } from "../entities/team.entity";

export abstract class TeamDataSource {
    abstract createTeam(dto: jwtDto): Promise<TeamEntity>;
    abstract getAllTeams(dto: jwtDto): Promise<TeamEntity[]>;
    abstract updateTeam(dto: jwtDto): Promise<TeamEntity | null>;
    abstract deleteTeam(dto: jwtDto, TeamId: string): Promise<boolean>;
}
