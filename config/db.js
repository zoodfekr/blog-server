import mongoose from "mongoose";

export const connectDB = async () => {
    const { MONGODB_URL, MONGODB_PORT, MONGODB_DB } = process.env;
    // ساخت رشته اتصال کامل با ترکیب آدرس، پورت و نام دیتابیس
    const connectionString = `${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DB}`;
    
    try {
        const conn = await mongoose.connect(connectionString);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

