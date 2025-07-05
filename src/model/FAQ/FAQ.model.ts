import { model, Schema } from 'mongoose';
import { IFAQ } from '../../service/interfac/FAQ/FAQ.interfac';
const FAQSchema: Schema = new Schema<IFAQ>({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    category: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const FAQ = model<IFAQ>('FAQ', FAQSchema);
export default FAQ;