import mongoose, { Schema } from "mongoose";
import { INotification, NotificationTypeStatus } from '../../service/interfac/notification/notification.interfac';
const notificationSchema: Schema = new Schema<INotification>({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
    },
    type: {
        type: String,
        enum: Object.values(NotificationTypeStatus),
        default: NotificationTypeStatus.ORDER,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Notification = mongoose.model<INotification>('Notification', notificationSchema);
export default Notification;