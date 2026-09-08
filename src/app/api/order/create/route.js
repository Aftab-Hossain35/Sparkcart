import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import User from "@/models/user";
import { inngest } from "@/config/inngest";

export async function POST(request) {
    try {
        // Get logged-in user
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { address, items } = await request.json();

        // Validate request data
        if (!address || !items || items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid data",
                },
                { status: 400 }
            );
        }

        // Calculate amount
        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Product not found: ${item.product}`,
                    },
                    { status: 404 }
                );
            }

            amount += product.offerPrice * item.quantity;
        }

        // 2% tax/fee
        const totalAmount = amount + Math.floor(amount * 0.02);

        // Create order event
        await inngest.send({
            name: "order/created",
            data: {
                userId,
                address,
                items,
                amount: totalAmount,
                date: Date.now(),
            },
        });

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Clear cart
        user.cartItems = {};
        await user.save();

        // IMPORTANT: Return response
        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            amount: totalAmount,
        });
    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Something went wrong",
            },
            { status: 500 }
        );
    }
}