import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const users = ['7009619033','9602081102','9838377955','9910329901']
    try {
        const { phone, password } = await req.json();
        console.log(phone in users)

        if (users.includes(phone)) {

            if (password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({ phone }, 'this is jwt secret')
                return NextResponse.json({ success: true, message: "Admin logged in successfully", token: token });
            } else {
                return NextResponse.json({ success: false, message: "Invalid credentials" });
            }
        } else {
            return NextResponse.json({ success: false, message: "Admin doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the admin : " + error });
    }
}
