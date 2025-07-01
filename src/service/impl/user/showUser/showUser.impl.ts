import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
const showUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "User doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User has been fetched successfully!",
            user
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}
export default showUser;