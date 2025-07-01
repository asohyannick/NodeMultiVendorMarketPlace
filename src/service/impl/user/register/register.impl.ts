import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import jwt from 'jsonwebtoken';
const register = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({ email, isAdmin: true });
        if (user) {
            user.refreshToken = '';
            await user.save();
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exist!" });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            isAdmin: true,
        });
        await newUser.save();
        const accessToken = jwt.sign({ id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, password: newUser.password, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({ id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, password: newUser.password, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '7d'
        });
        newUser.refreshToken = refreshToken;
        await newUser.save();
        res.cookie('auth', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            sameSite: 'strict',
            maxAge: 900000,
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User registration is successful!",
            accessToken,
            refreshToken,
            user: newUser._id
        })
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default register;