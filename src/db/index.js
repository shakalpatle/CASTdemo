import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config({
    path: "./env"
})

const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(
            `mongodb+srv://shakal0504:shakal0504@youtube.jyw0rxj.mongodb.net/?retryWrites=true&w=majority&appName=Youtube`,
        );
        console.log(`MongoDB Connected at: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);

    }
};

export default connectDB