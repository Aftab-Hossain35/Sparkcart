import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import  connectDB from "@/config/db";
import Product from "@/models/product";
import authSeller from "@/lib/authSeller";

export async function GET(request) {
    try {
        await connectDB()
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' });
        }

        const products = await Product.find({})
        return NextResponse.json({ success: true, products })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}