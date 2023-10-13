import Order from "@/models/Order";
import Vendor from "@/models/Vendor";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

import jwt from 'jsonwebtoken'

export async function POST(req) {
    try {
        const { vendor_token } = await req.json();

        const data = jwt.verify(vendor_token, 'this is jwt secret')
        const number = data.number
        // Connecting to database
        await connectDB()

        // Checking if the user already exists
        let vendor = await Vendor.findOne({ number });

        if (vendor) {
            const orders = await Order.find({vendorId: vendor._id})
            return NextResponse.json({ success: true, message: "Orders fetched successfully", orders});
        } else {
            return NextResponse.json({ success: false, message: "Vendor doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the vendor : " + error });
    }
}

