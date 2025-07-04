import { Request, Response } from "express";
import Notification from "../../../../model/notification/notification.model";
import { StatusCodes } from "http-status-codes";
import { NotificationTypeStatus } from "../../../interfac/notification/notification.interfac";
const updateNotification = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { message, isRead } = req.body;
        const notification = await Notification.findByIdAndUpdate(id, {
            message,
            type: NotificationTypeStatus.REVIEW,
            isRead
        }, { new: true, runValidators: true });
        if (!notification) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Notification message doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Notification message has been updated successfully!",
            notification,
        })
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateNotification;