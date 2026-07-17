import mongoose from "mongoose";

export const connectDB = async ()=>{

    try{
        // console.log("URI from .env:", process.env.MONGO_URI);
        const connection = await mongoose.connect(process.env.MONGO_URI);
        
    } catch (error) {
        // console.error(" MongoDB Connection Failed");
        console.error(error.message);
        console.error("MongoDB Connection Failed");
    // console.error("Name:", error.name);
    // console.error("Message:", error.message);
    // console.error("Code:", error.code);
    console.error(error);

        process.exit(1)

    }
}          