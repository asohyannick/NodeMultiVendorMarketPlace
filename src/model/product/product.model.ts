import mongoose, { Schema } from "mongoose";
import { IProduct, ProductStatus } from "../../service/interfac/product/product.interfac";
const productSchema: Schema = new Schema<IProduct>({
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    vendorId: {
        type: Schema.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
    },
    stockQuantity: {
        type: Number,
    },
    images: [{
        url: { type: String },
        altText: { type: String, trim: true },
    }],
    ratings: [{
        userId: { type: Schema.ObjectId, ref: 'User', required: true },
        score: { type: Number },
        comment: { type: String, trim: true },
    }],
    tags: [{
        type: String,
        trim: true,
    }],
    status: {
        type: String,
        enum: Object.values(ProductStatus),
        default: ProductStatus.OUT_OF_STOCK,
    },
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;