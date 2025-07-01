import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
        }
        const matchedPassword = await bcrypt.compare(user.password, password);
        if (!matchedPassword) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Invalid Credentials"});
        }
        const accessToken = jwt.sign({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '7d'
        });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('auth', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            sameSite: 'strict',
            maxAge: 900000,
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User has logged in successfully!",
            accessToken,
            refreshToken,
            user: user._id
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default login;