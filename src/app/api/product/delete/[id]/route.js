import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import connectDB from "@/config/db";
import Product from "@/models/product";

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { userId } =  getAuth(request);

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { id } = await params;

        const product = await Product.findById({
            _id: id,
            userId: userId,
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        await Product.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {

        console.error("DELETE PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}