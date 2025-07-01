import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const logout = async (_req: Request, res: Response): Promise<Response> => {
    try {
        res.cookie('auth', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            sameSite: 'strict',
            maxAge: 900000,
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User has been logged out successfully!",
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default logout;