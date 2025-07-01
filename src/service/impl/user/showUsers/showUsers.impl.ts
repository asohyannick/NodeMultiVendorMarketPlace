import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
const showUsers = async (_req: Request, res: Response): Promise<Response> => {

    try {
        const users = await User.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Authenticated users have been fetched successfully!",
            users
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}
export default showUsers;