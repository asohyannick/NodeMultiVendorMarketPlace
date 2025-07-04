import { Document } from "mongoose";
import { cartItems } from "../cart/cart.interfac";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    refreshToken: string;
    cart: cartItems[];
}