import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/admin`)
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
}

export default connectToDatabase