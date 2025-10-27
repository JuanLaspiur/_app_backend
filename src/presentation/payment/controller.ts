import { Request, Response } from "express";
import { jwtDto, CreatePaymentDto } from "../../domain/dtos";
import { CustomError, PaymentRepository } from "../../domain";

export class PaymentController {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createPayment(req: Request, res: Response) {
        try {
            const [errorPayment, createPaymentDto] = CreatePaymentDto.create(req.body);
            if (errorPayment || !createPaymentDto) throw CustomError.badRequest(errorPayment ? errorPayment : 'Error create payment body info');
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const payment = await this.paymentRepository.createPayment(dto, createPaymentDto);
            return res.status(201).json(payment);
        } catch (error) {
            this.handleError(error, res);
        }
    }
    async getAllPayment(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const payments = await this.paymentRepository.getAllPayment(dto);
            return res.status(201).json(payments);
        } catch (error) {
            this.handleError(error, res);
        }
    }
    async getOunAllPayment(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw CustomError.unauthorized('unauthorized');
            const [errorJwt, dto] = jwtDto.create({ token: authHeader });
            if (errorJwt || !dto) throw CustomError.unauthorized(errorJwt ? errorJwt : 'Unauthorized');
            const payments = await this.paymentRepository.getOunAllPayment(dto);
            return res.status(201).json(payments);
        } catch (error) {
            this.handleError(error, res);
        }
    }
}