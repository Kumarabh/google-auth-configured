import mongoose from "mongoose";
const dbUrl = process.env.MONGO_URL || 'mongodb+srv://admin:root@cluster0.krq1k5z.mongodb.net/';
const connectDB = async() => {
    try {
        await mongoose.connect(dbUrl, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        console.log('database connected.');
    } catch (err) {
        console.log(`${err} connection failed.`)
    }
}

export default connectDB;