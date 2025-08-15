import chalk from "chalk";
import mongoose from "mongoose";

export const connectDB = async () => {


    mongoose
        .connect(`${process.env.MONGODB_URI}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`)
        .then(() => console.log(chalk.greenBright("Connected to MongoDB successfully")))
        .catch((err) => console.error("Error connecting to MongoDB:", err));
};
