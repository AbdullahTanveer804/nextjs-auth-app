import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
connectDB();

export async function POST(request: NextResponse) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(reqbody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User exits");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

        const tokenData ={
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h"}) //! mark as non-null assertion operator


       const response = NextResponse.json({ message: "Login Successfully", success: true})

       response.cookies.set("token", token, {
        httpOnly: true
       })
       return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
