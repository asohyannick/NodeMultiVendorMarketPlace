import 'dotenv/config';
import mongoose from 'mongoose';
const MONGODB_URL: string = process.env.MONGODB_URI as string;
const connectToDB = async () => {
    if (!MONGODB_URL) {
        console.log("MongoDB connection string in invalid!", MONGODB_URL);
        return;
    }
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connection is successful!');
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error Occurred while connecting to the database!", error);
        }
    }
}

export default connectToDB;