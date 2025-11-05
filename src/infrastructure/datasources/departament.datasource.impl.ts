import { CustomError, DepartmentDataSource, DepartmentEntity } from "../../domain";
import { jwtDto, CreateDepartmentDto, UpdateDepartmentDto } from "../../domain/dtos";
import { DepartamentMapper } from "../mappers/departament.mapper";
import * as departamentsUseCases from  '../../domain/use-cases/departament'

export class DepartmentDataSourceImpl implements DepartmentDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }

    private authorize(dto: jwtDto) {
      const userId = this.verifyToken(dto);
       if (!userId) throw CustomError.unauthorized("unauthorized: invalid authtoken");
      return userId;
    }


  async createDepartment(dto: jwtDto, createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    try {
    this.authorize(dto);
      const doc = await departamentsUseCases.Create.execute(createDepartmentDto)
      return DepartamentMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllDepartments(dto: jwtDto): Promise<DepartmentEntity[]> {
    try {
      this.authorize(dto);
      const docs = await departamentsUseCases.GetAll.execute();
      return DepartamentMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateDepartment(dto: jwtDto, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity | null> {
    try {
      this.authorize(dto);
      const doc = await departamentsUseCases.Update.execute(updateDepartmentDto);
      return doc ? DepartamentMapper.toEntity(doc) : null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteDepartment(dto: jwtDto, departmentId: string): Promise<boolean> {
    try {
      this.authorize(dto);
      const res =await departamentsUseCases.Delete.execute(departmentId);
      return !!res;
    } catch (error) {
      this.handleError(error);
    }
  }
}
