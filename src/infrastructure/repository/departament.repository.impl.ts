import { DepartmentDataSource, DepartmentEntity, DepartmentRepository } from "../../domain";
import { jwtDto, CreateDepartmentDto, UpdateDepartmentDto } from "../../domain/dtos";

export class DepartmentRepositoryImpl implements DepartmentRepository {

 constructor( private readonly dataSource: DepartmentDataSource){}
  createDepartment(dto: jwtDto, createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
     return this.dataSource.createDepartment(dto, createDepartmentDto);
  }
  getAllDepartments(dto: jwtDto): Promise<DepartmentEntity[]> {
    return this.dataSource.getAllDepartments(dto);
  }
  updateDepartment(dto: jwtDto, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity | null> {
    return this.dataSource.updateDepartment(dto, updateDepartmentDto);
  }
  deleteDepartment(dto: jwtDto, departmentId: string): Promise<boolean> {
    return this.dataSource.deleteDepartment(dto, departmentId);
  }

}
