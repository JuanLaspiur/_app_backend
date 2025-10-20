import { CreateDepartmentDto, jwtDto, UpdateDepartmentDto } from "../dtos";
import { DepartmentEntity } from "../entities/department.entity";

export abstract class DepartmentDataSource {
  abstract createDepartment(dto:jwtDto, createDepartmentDto:CreateDepartmentDto ): Promise<DepartmentEntity>; 
  abstract getAllDepartments(dto:jwtDto): Promise<DepartmentEntity[]>; // 
  abstract updateDepartment(dto:jwtDto, updateDepartmentDto:UpdateDepartmentDto): Promise<DepartmentEntity | null>;
  abstract deleteDepartment(dto:jwtDto, departmentId: string): Promise<boolean>;
}
