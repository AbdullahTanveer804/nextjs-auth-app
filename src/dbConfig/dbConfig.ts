import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!); // Use the ! operator to assert that MONGODB_URI is not undefined
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    connection.on("error", (error) => {
      console.log("Error connected to database");
      console.log(error);
      process.exit(); // Exit the process with failure
    });
  } catch (error) {
    console.log("Error  connecting to database", error);
    console.log(error);
  }
}
