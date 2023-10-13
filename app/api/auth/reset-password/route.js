import User from '@/models/User';
import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongoose';
import Cryptr from 'cryptr';
import CryptoJS from "crypto-js";

export async function POST(req) {
    const { encryptedEmail, signature, password } = await req.json()

    const cryptr = new Cryptr('thisiscryptrsecret')
    const email = cryptr.decrypt(encryptedEmail)
    console.log(email)

    connectDB()

    try {
        //  Check for the user
        let user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ success: false, message: "Sorry, this user does not exist" })
        }
        if (user.password_reset_token !== signature) {
            if (user.password_reset_token = "") {
                return NextResponse.json({ success: false, message: "Sorry, this link has expired" })
            }
            return NextResponse.json({ success: false, message: "Sorry, permission denied" })
        }
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
        user.password = encryptedPassword;
        user.password_reset_token = "";
        await user.save();
        return NextResponse.json({ status: 200, success: true, message: "Your password has been reset successfully. You may securely close this page" })
    } catch (e) {
        console.log("An error occurred : " + e)
        return NextResponse.json({ status: 500, success: false, message: "Something went wrong, please try again later" })
    }
}