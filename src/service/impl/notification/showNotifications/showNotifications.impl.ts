import { Request, Response } from "express";
import Notification from "../../../../model/notification/notification.model";
import { StatusCodes } from "http-status-codes";
const showNotifications = async(_req: Request, res: Response): Promise<Response> => {
 try {
    const notifications = await Notification.find();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Notification messages have been fetched successfully!",
        notifications,
    })
 } catch (error) {
    console.error("Error occured!", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong!",
        error: error instanceof Error ? error.message : "Unknown Error",
    });
 }
}

export default showNotifications;