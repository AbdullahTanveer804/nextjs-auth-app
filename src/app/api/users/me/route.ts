import { connectDB } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helper/getTokanData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest){
    //Extract data from token
    const userId = await getTokenData(request)
    const user = await User.findOne({_id: userId}).select("-password") 
    if(!user){
        return NextResponse.json({message: "User not found"}, {status: 404})
    }
    return NextResponse.json({message: "User Found", data: user}, {status: 200})
}