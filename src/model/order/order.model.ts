import mongoose, { Schema } from "mongoose";
import { IOrder, OrderStatus, PaymentCashMethodStatus, PaymentMethodStatus } from "../../service/interfac/order/order.interfac";
const orderSchema: Schema = new Schema<IOrder>({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    vendor: {
        type: Schema.ObjectId,
        ref: 'Vendor',
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Product',
        },
        stockQuantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
    }],
    shippingAddress: {
        name: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    payment: {
        method: {
            type: String,
            enum: Object.values(PaymentCashMethodStatus),
            default: PaymentCashMethodStatus.BANK_TRANSFER,
        },
        status: {
            type: String,
            enum: Object.values(PaymentMethodStatus),
            default: PaymentMethodStatus.PENDING,
        },
        transactionId: {
            type: String,
            trim: true,
        },
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
    },
    totalAmount: {
        type: Number,
    },
}, { timestamps: true });
const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;