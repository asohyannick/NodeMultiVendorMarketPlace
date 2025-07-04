import { Document, Types } from "mongoose";
export enum NotificationTypeStatus {
    ORDER = 'Order',
    REVIEW = 'Review',
    PROMOTION = 'Promotion',
    SYSTEM = 'System',
}
export interface INotification extends Document {
    user: Types.ObjectId;
    message: string;
    type: NotificationTypeStatus;
    isRead: boolean;
}