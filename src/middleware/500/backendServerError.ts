import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const backendServerError = (_req: Request, res: Response) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong!",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
}
export default backendServerError;