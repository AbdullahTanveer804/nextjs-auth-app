import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;
    // Validation Later
    console.log(reqbody);


    const user = await User.findOne({ email });
    if (user) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
      );
    }


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser =  new User({
        username,
        email,
        password: hashedPassword
    })


    const savedUser = await newUser.save()
    console.log(savedUser);


    //Sending Email for verification
    await sendEmail({
        email, emailType: "VERIFY", userId: savedUser._id
    })


    return NextResponse.json({
        message: "User registered successfully",
        success: true,
        savedUser
    })


  } catch (error: any) {
        return NextResponse.json({ error: error.message }, 
        { status: 500 });
  }
}
