import mongoose from "mongoose";

// Connect to MongoDB
export const connectToDB = async () => {
  return await mongoose.connect(String(process.env.MONGO_URI || Bun.env.MONGO_URI), {});
}

// Disconnect from MongoDB
export const closeFromDB = async () => {
  return await mongoose.connection.close();
}