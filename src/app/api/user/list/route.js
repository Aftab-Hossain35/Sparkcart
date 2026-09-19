import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        await connectDB();
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        // =====================================================
        // IMPORTANT:
        // Replace this with your actual admin/seller check.
        // Do NOT allow every logged-in user to access this API.
        // =====================================================


        const users = await User.find({})
            .select("_id clerkId name email imageUrl")
            .sort({ _id: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            users,
        });

    } catch (error) {
        console.error("GET USERS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}