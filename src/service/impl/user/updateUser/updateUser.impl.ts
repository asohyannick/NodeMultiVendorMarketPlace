import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            password,
            isAdmin: true,
        }, { new: true, runValidators: true });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Authenticated user has been updated successfully!",
            user
        });
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}
export default updateUser;