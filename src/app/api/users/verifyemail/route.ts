import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json()
        const {token} = reqbody
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        
        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }
        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message: "Email verified successfully"}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}