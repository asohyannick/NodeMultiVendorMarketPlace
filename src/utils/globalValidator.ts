import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { StatusCodes } from "http-status-codes";
const globalValidator = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            console.error("Validation Error", error);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation Error Occurred!",
                error: error instanceof Error ? error.message : "Unknown Error",
            });
        }
    }
}
export default globalValidator;