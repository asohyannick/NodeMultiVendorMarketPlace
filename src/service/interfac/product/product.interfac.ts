import { Document, Types } from "mongoose";
export enum ProductStatus {
    AVAILABLE = 'Available',
    OUT_OF_STOCK = 'Out of Stock',
    DISCONTINUED = 'Discontinued',
}
export interface IProduct extends Document {
    name: string;
    description: string;
    vendorId: Types.ObjectId;
    categoryId: Types.ObjectId;
    price: number;
    stockQuantity: number;
    images: [{
        url: string;
        altText: string;
    }],
    ratings: [{
        userId: Types.ObjectId;
        score: number;
        comment: string;
    }],
    tags: string[];
    status: ProductStatus;
}