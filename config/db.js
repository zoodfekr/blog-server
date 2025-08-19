import chalk from "chalk";
import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() =>
      console.log(chalk.greenBright("Connected to MongoDB successfully"))
    )
    .catch((err) =>
      console.error(chalk.red("Error connecting to MongoDB:"), err)
    );
};
