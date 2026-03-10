import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGODB_URL !;

if(! MONGO_DB_URI){
      throw new Error("Please define MONGODB_URI");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_DB_URI);
};