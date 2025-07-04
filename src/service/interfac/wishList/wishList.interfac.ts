import { Document, Types } from "mongoose";
export interface IWishList extends Document {
    userId: Types.ObjectId,
    items: [{
        productId: {
            type: Types.ObjectId,
        },
        addedAt: {
            type: Date,
        },
        notes: {
            type: string,
        },
    }],
}