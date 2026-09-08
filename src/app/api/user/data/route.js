import connectDB from "@/config/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import {getAuth} from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    await connectDB();
    const { userId } = getAuth(request);

    console.log("CLERK ID:", userId);

    const Users = await User.find({}).select("_id clerkId email name");

    console.log("MONGODB USERS:", Users);

    const user = await User.findById(userId);

    console.log("FOUND USER:", user);

    if (!user) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
} 