import { Request, Response } from "express";
import Notification from "../../../../model/notification/notification.model";
import { NotificationTypeStatus } from "../../../interfac/notification/notification.interfac";
import { StatusCodes } from "http-status-codes";
const createNotification = async(req: Request, res: Response): Promise<Response> => {
    const { message, isRead } = req.body;
 try {
    const newNotification = new Notification({
        message,
        type: NotificationTypeStatus.PROMOTION,
        isRead
    });
    await newNotification.save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "A new notification message has been created successfully!",
        newNotification,
    })
 } catch (error) {
    console.error("Error occured!", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong!",
        error: error instanceof Error ? error.message : "Unknown Error",
    });
 }
}

export default createNotification;