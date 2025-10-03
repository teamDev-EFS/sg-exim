import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://the11eximuser:TjNy5QpiJu%23E%40%25S@cluster-namasteexim.kwpijax.mongodb.net/the11eximoverseas?retryWrites=true&w=majority&appName=Cluster-namasteexim",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
      }
    );

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📊 Database: the11eximoverseas`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
