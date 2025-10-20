import { DepartmentDataSource, DepartmentEntity } from "../../domain";
import { jwtDto, CreateDepartmentDto, UpdateDepartmentDto } from "../../domain/dtos";
import { CustomError } from "../../domain";
import { DepartmentModel } from "../../data/mogodb/models/department.model";
import { DepartamentMapper } from "../mappers/departament.mapper";

export class DepartmentDataSourceImpl implements DepartmentDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}

  async createDepartment(dto: jwtDto, createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    try {
      const userId = this.verifyToken(dto);

      const [error, validDto] = CreateDepartmentDto.create(createDepartmentDto);
      if (error || !validDto) throw CustomError.badRequest(error ?? "Invalid department data");

      const doc = await DepartmentModel.create({ ...validDto });
      return DepartamentMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllDepartments(dto: jwtDto): Promise<DepartmentEntity[]> {
    try {
      this.verifyToken(dto);
      const docs = await DepartmentModel.find();
      return docs.map(DepartamentMapper.toEntity);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateDepartment(dto: jwtDto, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity | null> {
    try {
      this.verifyToken(dto);

      const [error, validDto] = UpdateDepartmentDto.create(updateDepartmentDto);
      if (error || !validDto) throw CustomError.badRequest(error ?? "Invalid department update data");

      const doc = await DepartmentModel.findByIdAndUpdate(validDto.id, validDto, { new: true });
      return doc ? DepartamentMapper.toEntity(doc) : null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteDepartment(dto: jwtDto, departmentId: string): Promise<boolean> {
    try {
      this.verifyToken(dto);
      const res = await DepartmentModel.findByIdAndDelete(departmentId);
      return !!res;
    } catch (error) {
      this.handleError(error);
    }
  }
}
