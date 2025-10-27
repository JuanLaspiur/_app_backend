import { Router } from "express";
import { PaymentController } from "./controller";
import { PaymentDataSourceImpl, PaymentRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";


export class PaymentRoutes {
    static get routes(): Router {
        const datasource = new PaymentDataSourceImpl(verifyToken, handleError);
        const paymentRepository = new PaymentRepositoryImpl(datasource);
        const controller = new PaymentController(paymentRepository, handleErrorController);

        const router = Router();
        router.post('/create/', controller.createPayment.bind(controller));
        router.get('/getAll', controller.getAllPayment.bind(controller));
        router.get('/getOwn', controller.getOunAllPayment.bind(controller));

        return router;
    }
}