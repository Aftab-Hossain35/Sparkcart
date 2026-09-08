import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import "@/models/Address";
import "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

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

    const orders = await Order.find({ userId })
      .populate("address")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ORDER LIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}