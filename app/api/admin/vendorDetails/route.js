import Vendor from "@/models/Vendor";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await connectDB()
        // const { userToken } = await req.json();
        let vendors = await Vendor.find();
        return NextResponse.json({success: true, vendors});
    } catch (error) {
        return NextResponse.json({success: false, error: "An error occurred while fetching vendors." });
    }
}