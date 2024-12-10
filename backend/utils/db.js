import mongoose from 'mongoose'

const connectDB=async ()=>{
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");

}
catch(err){
    console.log("Error while connecting to MongoDB",err)
}
}

export default connectDB;