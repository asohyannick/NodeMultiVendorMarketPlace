import { Document, Types } from "mongoose";
export interface IContact extends Document {
    userId: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    },
    notes: string;
}