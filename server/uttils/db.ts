import mongoose from "mongoose";
require("dotenv").config();

const dbURL: string = process.env.DB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL).then((data: any) => {
      console.log("DB Connected successfully: ", data.connection.host);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(() => connectDB, 5000);
    process.exit(1);
  }
};

export default connectDB;
