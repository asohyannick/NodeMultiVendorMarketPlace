import { Document, Types } from "mongoose";
export interface IReview extends Document {
    user: Types.ObjectId;
    product: Types.ObjectId;
    rating: number;
    title: string;
    comment: string;
    images: [{
        url: string;
        altText: string;
    }];
    helpfulCount: number;
    reported: boolean;
}