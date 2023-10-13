import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, phoneNumber } = await req.json();

    const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (user) {
      const errorMessage = user.email === email ? "User already exists with this email" : "User already exists with this phone number";
      return NextResponse.json({ success: false, message: errorMessage });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    await User.create({ name, email, phoneNumber, password: encryptedPassword });

    const token = jwt.sign({ name, email, phoneNumber }, 'this is jwt secret');
    return NextResponse.json({ success: true, message: "User created successfully", token });
  } catch (error) {
    return NextResponse.json({ success: false, error: "An error occurred while creating the user: " + error });
  }
}
