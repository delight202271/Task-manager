import mongoose from "mongoose";
import "dotenv/config";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () =>{
  try {
      await mongoose.connect(process.env.MONGO_URL! as string)
      console.log("MongoDB Connected Successfully");
      
  } catch (error) {
    console.error("MongoDB connection Failed", error);
    
  }
}

export default connectDB