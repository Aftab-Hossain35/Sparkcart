import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

import connectDB from "@/config/db";
import User from "@/models/user";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { userId: adminId } = await auth();

        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID is required",
                },
                { status: 400 }
            );
        }

        // =====================================================
        // IMPORTANT:
        // ADD YOUR ADMIN AUTHORIZATION HERE
        // =====================================================


        // Find MongoDB user
        const user = await User.findById({
            _id: id,
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found in database",
                },
                { status: 404 }
            );
        }

        // Prevent admin from accidentally deleting themselves
        if (id === adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You cannot delete your own account",
                },
                { status: 400 }
            );
        }

        // =====================================================
        // DELETE FROM CLERK
        // =====================================================

        const client = await clerkClient();

        await client.users.deleteUser(id);

        // =====================================================
        // DELETE FROM MONGODB
        // =====================================================

        await User.findByIdAndDelete({
            _id: id,
        });

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}