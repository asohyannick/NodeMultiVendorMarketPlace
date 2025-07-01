import { Document } from "mongoose";
export enum MaritalStatus {
    MARRIED = 'Married',
    SINGLE = 'Single',
    DIVORCE = 'Divorce',
}
export interface IProfile extends Document {
    firstName: string;
    lastName: string;
    email: string;
    address:{
        street: string;
        phoneNumber: string;
        city: string;
        zipCode: string;
        state: string;
        country: string;
    };
    carier: string;
    hobby: string[];
    married: MaritalStatus,
    date: Date;
}