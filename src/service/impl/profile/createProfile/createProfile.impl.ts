import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import { MaritalStatus } from "../../../interfac/profile/profile.interfac";
const createProfile = async (req: Request, res: Response): Promise<Response> => {
    const {
        firstName,
        lastName,
        email,
        address,
        carier,
        hobby,
    } = req.body;
    try {
        const newProfile = new User({
            firstName,
            lastName,
            email,
            address,
            carier,
            hobby,
            married: MaritalStatus.MARRIED,
            date: Date.now(),
        });
        await newProfile.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User profile has been created successfully!",
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createProfile;