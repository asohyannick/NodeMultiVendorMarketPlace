import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import { MaritalStatus } from "../../../interfac/profile/profile.interfac";
const updateProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            address,
            carier,
            hobby,
        } = req.body;
        const profile = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            address,
            carier,
            hobby,
            married: MaritalStatus.MARRIED,
            date: Date.now(),
        }, { new: true, runValidators: true });
        if (!profile) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Profile doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User profile has been updated successfully!",
            profile
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateProfile;