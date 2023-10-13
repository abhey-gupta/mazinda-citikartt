import Order from "@/models/Order";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Connecting to database
        await connectDB()
        const orders = await Order.find()
        return NextResponse.json({ success: true, message: "Orders fetched successfully", orders });

    } catch (error) {
        return NextResponse.json({ success: false, error: "orderFetch: An error occurred while fetching the orders : " + error });
    }
}