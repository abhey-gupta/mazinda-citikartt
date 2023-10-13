import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();
        const { name, email } = await req.json();
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ name, email }, 'this is jwt secret');
            return NextResponse.json({ success: true, message: "User logged in successfully", token });
        }
        else {
            await User.create({ name, email });
            const token = jwt.sign({ name, email }, 'this is jwt secret');
            return NextResponse.json({ success: true, message: "User created successfully", token });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while continuing with google: " + error });
    }
}
