import { Document, Types } from "mongoose";
export interface ICategory extends Document {
    categoryId: Types.ObjectId;
    productId: Types.ObjectId;
    name: string;
    description: string;
    image:{
        url: string;
        altText: string;
    };
    isActive: boolean;
}