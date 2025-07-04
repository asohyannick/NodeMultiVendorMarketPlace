import { Document, Types } from "mongoose";
export interface cartItems {
    productId: Types.ObjectId;
    stockQuantity: number;
}
export interface ICart  extends Document {
    userId: Types.ObjectId;
    items:cartItems[];
}