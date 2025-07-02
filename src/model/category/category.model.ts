import mongoose, { Schema } from "mongoose";
import { ICategory } from "../../service/interfac/category/category.interfac";
const categorySchema = new Schema<ICategory>({
    categoryId: {
        type: Schema.ObjectId,
        ref: 'Category',
    },
    productId: {
        type: Schema.ObjectId,
        ref: 'Product',
    },
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    image: {
        url: { type: String },
        altText: { type: String, trim: true },
    },
    isActive: {
        type: Boolean,
    },
}, { timestamps: true });
const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;