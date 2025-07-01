import { Document, Types } from "mongoose";
export enum VendorStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    SUSPENDED = 'Suspended',
}
export enum VendorTypeStatus {
    BUSINESS_LICENSE = 'BusinessLicense',
    TAX_ID = 'TaxID',
    OTHER = 'Other',
}
export interface IVendor extends Document {
    name: string;
    description: string;
    contact: {
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            zipCode: string;
        };
    };
    socialMedia: {
        facebook: string;
        twitter: string,
        instagram: string;
        linkedin: string;
    };
    productId: Types.ObjectId;
    ratings: [{
        userId: Types.ObjectId;
        score: string;
        comment: string;
    }];
    status: VendorStatus;
    lastLogin: Date;
    verified: boolean;
    commissions: number;
    feedback: [{
        userId: Types.ObjectId;
        feedback: string;
    }];
    documents: [{
        type: VendorTypeStatus;
        url: string,
        verified: boolean;
    }];
}