import { CreateDepartmentDto, jwtDto, UpdateDepartmentDto } from "../dtos";
import { DepartmentEntity } from "../entities/department.entity";

export abstract class DepartmentRepository {
  abstract createDepartment(dto:jwtDto, createDepartmentDto:CreateDepartmentDto ): Promise<DepartmentEntity>; // quiero crear el createDepartmentDto
  abstract getAllDepartments(dto:jwtDto): Promise<DepartmentEntity[]>; // 
  abstract updateDepartment(dto:jwtDto, updateDepartmentDto:UpdateDepartmentDto): Promise<DepartmentEntity | null>;// quiero crear el updateDepartmentDto
  abstract deleteDepartment(dto:jwtDto, departmentId: string): Promise<boolean>;
}
