import { Schema, model } from "mongoose";
import { IWishList } from "../../service/interfac/wishList/wishList.interfac";
const wishListSchema: Schema = new Schema<IWishList>({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    items: [{
        productId: {
            type: Schema.ObjectId,
            ref: 'Product',
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
        },
    }],
}, { timestamps: true });
const WishList = model<IWishList>('WishList', wishListSchema);
export default WishList;