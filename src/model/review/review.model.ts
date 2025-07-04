import mongoose, { Schema } from 'mongoose';
import { IReview } from '../../service/interfac/review/review.interfac';
const reviewSchema: Schema = new Schema<IReview>({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
    },
    rating: {
        type: Number,
    },
    title: {
        type: String,
    },
    comment: {
        type: String,
    },
    images: [{
        url: { type: String },
        altText: { type: String },
    }],
    helpfulCount: {
        type: Number,
    },
    reported: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;