import { Document } from "mongoose";
export interface IFAQ extends Document {
    question: string;
    answer: string;
    category: string; 
    isActive: boolean; 
}