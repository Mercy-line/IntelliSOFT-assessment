import mongoose from 'mongoose';
const ConnectToDB = async()=>{
    try {
        console.log("Attempting to connect to DB with URL:", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB")
    } catch (error) {
        console.log("error in connecting to DB")
    }
}
export default ConnectToDB;