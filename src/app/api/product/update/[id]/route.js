import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import connectDB from "@/config/db";
import Product from "@/models/product";

// =========================
// GET single product (used to prefill the edit form)
// =========================

export async function GET(request, { params }) {
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

        const { id } = await params;

        // NOTE: findById only accepts an id, not a filter object.
        // Use findOne so we can also scope the lookup to this seller.
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

        return NextResponse.json({
            success: true,
            product,
        });

    } catch (error) {

        console.error("GET PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// =========================
// PUT update product
// =========================

export async function PUT(request, { params }) {
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

        const { id } = await params;

        const body = await request.json();

        const {
            name,
            description,
            category,
            price,
            offerPrice,
            image,
        } = body;

        // BUG FIX: findById takes only an id string/ObjectId, never a
        // filter object — passing { userId, _id } silently matched
        // nothing (or the wrong thing), so updates never actually saved.
        const product = await Product.findOne({
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

        product.name = name;
        product.description = description;
        product.category = category;
        product.price = price;
        product.offerPrice = offerPrice;

        if (image && image.length > 0) {
            product.image = image;
        }

        await product.save();

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            product,
        });

    } catch (error) {

        console.error("UPDATE PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
