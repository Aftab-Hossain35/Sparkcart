import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/product";
import authSeller from "@/lib/authSeller";
import "@/models/Address";

export async function GET(request) {
  try {
    await connectDB();

    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);


    if (!isSeller) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authorized",
        },
      );
    }

    const orders = await Order.find({})
      .populate("address")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("SELLER ORDER LIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
