import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log("\n MongoDb connected!!")
    } catch (error) {
        console.log("ERROR:", error)
        process.exit(1)
    }
}

export default connectDB;