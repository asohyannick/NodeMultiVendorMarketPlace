import mongoose, { Schema } from 'mongoose';
import { IVendor, VendorStatus, VendorTypeStatus } from '../../service/interfac/vendor/vendor.interfac';
const vendorSchema: Schema = new Schema<IVendor>({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    contact: {
        email: {
            type: String,
            unique: true,
            match: /.+\@.+\..+/,
        },
        phone: {
            type: String,
            match: /^\+\d{1,3}\d{1,14}$/,
        },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
    },
    socialMedia: {
        facebook: { type: String, trim: true },
        twitter: { type: String, trim: true },
        instagram: { type: String, trim: true },
        linkedIn: { type: String, trim: true },
    },
    productId: [{
        type: Schema.ObjectId,
        ref: 'Product',
    }],
    ratings: [{
        userId: { type: Schema.ObjectId, ref: 'User', required: true },
        score: { type: Number },
        comment: { type: String, trim: true },
    }],
    status: {
        type: String,
        enum: Object.values(VendorStatus),
        default: VendorStatus.SUSPENDED,
    },
    lastLogin: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    commissions: {
        type: Number,
    },
    feedback: [{
        userId: { type: Schema.ObjectId, ref: 'User' },
        feedback: { type: String, trim: true },
    }],
    documents: [{
        type: {
            type: String,
            enum: Object.values(VendorTypeStatus),
            default: VendorTypeStatus.TAX_ID,
        },
        url: { type: String, required: true },
        verified: { type: Boolean, default: false },
    }],
}, { timestamps: true });

const Vendor = mongoose.model<IVendor>('Vendor', vendorSchema);

export default Vendor;