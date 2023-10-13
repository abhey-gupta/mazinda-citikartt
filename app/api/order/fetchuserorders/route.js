import Order from "@/models/Order";
import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

import jwt from 'jsonwebtoken'

export async function POST(req) {
    try {
        const { userToken } = await req.json()

        const data = jwt.verify(userToken, 'this is jwt secret')
        const email = data.email
        // Connecting to database
        await connectDB()

        // Checking if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            const orders = await Order.find({userId: user._id})
            return NextResponse.json({ success: true, message: "Orders fetched successfully", orders});
        } else {
            return NextResponse.json({ success: false, message: "orderFetch: User doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "orderFetch: An error occurred while logging in the User : " + error });
    }
}

