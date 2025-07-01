import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../../../model/user/user.model";
const refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
    const { refreshToken } = req.body;
    if (!refreshAccessToken) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid Token" })
    }
    try {
        const userPlayLoad = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        const user = await User.findById(userPlayLoad.id);
        if (!user || refreshAccessToken !== refreshAccessToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Credentials" })

        }
        const accessToken = jwt.sign({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        res.cookie('auth', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            sameSite: 'strict',
            maxAge: 900000,
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new access token has been created successfully!",
            accessToken
        });
    } catch (error) {
        console.error("Error occurred!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default refreshAccessToken;