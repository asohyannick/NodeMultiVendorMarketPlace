import { Schema, model } from "mongoose";
import { IContact } from "../../service/interfac/contact/contact.interfac";
const contactSchema: Schema = new Schema<IContact>({
    userId: {
        type: Schema.ObjectId,
    },
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
    phone: {
        type: Number,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        zipCode: {
            type: String,
        },
    },
    notes: {
        type: String,
    },
}, { timestamps: true });
const Contact = model<IContact>('Contact', contactSchema);
export default Contact;