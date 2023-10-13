import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { identifier, password } = await req.json();

        // Connecting to the database
        await connectDB()

        // Checking if the user already exists with either email or phone number
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { phoneNumber: identifier }
            ]
        });

        if (user) {
            // Decrypting the password and matching it against the user's password
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

            if (password === decryptedPassword) {
                const token = jwt.sign({ name: user.name, email: user.email }, 'this is jwt secret')
                return NextResponse.json({ success: true, message: "Logged in successfully", token });
            } else {
                return NextResponse.json({ success: false, message: "Invalid credentials" });
            }
        } else {
            return NextResponse.json({ success: false, message: "User doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the user: " + error });
    }
}
