import mongoose, { Schema } from "mongoose";
import { IUser } from '../../service/interfac/user/user.interfac';
import bcrypt from 'bcryptjs';
const userSchema: Schema = new Schema<IUser>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    cart: [{
        productId: {
            type: Schema.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
        },
    }],
}, { timestamps: true });
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const User = mongoose.model<IUser>('User', userSchema);
export default User;