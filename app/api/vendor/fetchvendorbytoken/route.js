import Vendor from "@/models/Vendor";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import { headers } from 'next/headers';

import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        const headersList = headers()
        const vendor_token = headersList.get('vendor_token')

        const data = jwt.verify(vendor_token, 'this is jwt secret')
        const number = data.number
        // Connecting to database
        await connectDB()

        // Checking if the user already exists
        let vendor = await Vendor.findOne({ number });

        if (vendor) {
            return NextResponse.json({ success: true, message: "Vendor fetched successfully", vendor});
        } else {
            return NextResponse.json({ success: false, message: "Vendor doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the Vendor : " + error });
    }
}
