import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [8, "Password must be atleast 8 characters"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date, 
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User