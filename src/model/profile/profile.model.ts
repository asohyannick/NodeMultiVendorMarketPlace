import mongoose, { Schema } from "mongoose";
import { IProfile, MaritalStatus } from '../../service/interfac/profile/profile.interfac';
const profileSchema: Schema = new Schema<IProfile>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        street: {
            type: String,

        },
        phoneNumber: {
            type: String,

        },
        city: {
            type: String,

        },
        zipCode: {
            type: String,

        },
        state: {
            type: String,

        },
        country: {
            type: String,

        },
    },
    hobby: {
        type: [String],
        default: [],
    },
    carier: {
        type: String,

    },
    married: {
        type: String,
        enum: Object.values(MaritalStatus),
        default: MaritalStatus.SINGLE,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Profile = mongoose.model<IProfile>('Profile', profileSchema);
export default Profile;