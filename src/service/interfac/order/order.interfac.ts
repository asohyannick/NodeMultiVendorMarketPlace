import { Document, Types } from "mongoose";
export enum PaymentCashMethodStatus {
    CREDIT_CARD = 'Credit Card',
    PAYPAL = 'Paypal',
    BANK_TRANSFER = 'Bank Transfer',
    OTHERS = 'Others',
}
export enum PaymentMethodStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    FAILED = 'Failed',
}
export enum OrderStatus {
    PENDING = 'Pending',
    SHIPPED = 'Shipped',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'Cancelled',
    RETURNED = 'Returned',
}
export interface IOrder extends Document {
    user: Types.ObjectId;
    vendor: Types.ObjectId;
    products: [{
        product: Types.ObjectId;
        stockQuantity: number;
        price: number;
    }],
    shippingAddress: {
        name: string;
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    },
    payment: {
        method: {
            type: PaymentCashMethodStatus;
        },
        status: PaymentMethodStatus;
        transactionId: string;
    },
    status: OrderStatus;
    totalAmount: number;
}