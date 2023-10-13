import Vendor from "@/models/Vendor";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { number, password } = await req.json();

        // Connecting to database
        await connectDB()

        // Checking if the Vendor already exists
        let vendor = await Vendor.findOne({ number: number });

        if (vendor) {

            if (vendor.password === password) {
                const vendor_token = jwt.sign({ name: vendor.name, number: vendor.number }, 'this is jwt secret')
                return NextResponse.json({ success: true, message: "vendor logged in successfully", vendor_token: vendor_token });
            } else {
                return NextResponse.json({ success: false, message: "Invalid credentials" });
            }
        } else {
            return NextResponse.json({ success: false, message: "Vendor doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the Vendor : " + error });
    }
}
