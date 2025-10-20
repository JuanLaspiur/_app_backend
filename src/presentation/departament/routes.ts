import { Router } from "express";
import { DepartmentController } from './controller';
import { DepartmentDataSourceImpl, DepartmentRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class DepartmentRoutes{

    static get routes (): Router{
        const datasource = new DepartmentDataSourceImpl(verifyToken, handleError);
        const departmentRepository = new DepartmentRepositoryImpl(datasource);
        const controller = new DepartmentController(departmentRepository, handleErrorController);

        const router = Router();
        router.post('/create', controller.createDepartment.bind(controller));
        router.put('/update/:id', controller.updatedDepartment.bind(controller));
        router.get('/getAll', controller.getAllDepartments.bind(controller));
        router.delete('/delete/:id', controller.deleteDepartment.bind(controller));

        return router;
    }

}