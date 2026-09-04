import { getAuth } from "@clerk/nextjs/server"
import  connectDB from "@/config/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB()
        
        const { userId } = getAuth(request)
        const user = await User.findById(userId)

        const { cartItems } = user
         
        return NextResponse.json({ success: true, cartItems });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}