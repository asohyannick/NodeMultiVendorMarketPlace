import mongoose, { Schema } from "mongoose";
import { ICart } from '../../service/interfac/cart/cart.interfac';
const cartSchema: Schema = new Schema<ICart>({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    items: [{
        productId: {
            type: Schema.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
        },
    }]
}, { timestamps: true });
const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;