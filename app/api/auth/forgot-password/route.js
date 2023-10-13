import User from '@/models/User';
import { NextResponse } from 'next/server';
import cryptoRandomString from 'crypto-random-string';
import Cryptr from 'cryptr';
import { sendEmail } from '@/config/mail';
import connectDB from '@/libs/mongoose';

export async function POST(req) {
    const { email } = await req.json()

    connectDB()

    //  Check for the user
    let user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({ success: false, message: "Sorry, this user does not exist" })
    }

    const randomStr = cryptoRandomString({
        length: 64,
        type: 'alphanumeric'
    })
    user.password_reset_token = randomStr;
    await user.save()

    // Encrypt user email
    const cryptr = new Cryptr('thisiscryptrsecret')
    const encryptedEmail = cryptr.encrypt(user.email)

    const url = `${process.env.NEXT_PUBLIC_BASE_URI}/reset-password/${encryptedEmail}?signature=${randomStr}`

    try {
        const html =
            `
            <div>
                <div>
                    <h3>Password Reset Instructions | Citikartt</h3>
                </div>
                <div>
                    <p>Hello,</p>
                    <p>We have received a request to reset your password. To proceed, click the link below:</p>
                    <a href=${url}>Reset Password</a>
                    <p>If you did not request a password reset, you can safely ignore this email.</p>
                    <p>Thank you!</p>
                </div>
            </div>
        `

        // send the email to the user
        await sendEmail(email, "Reset Password | Citikartt", html)
        return NextResponse.json({ status: 200, success: true, message: "Email sent successfully, kindly check your inbox" })
    } catch (e) {
        console.log("An error occurred : " + e)
        return NextResponse.json({ status: 500, success: false, message: "Something went wrong, please try again later" })
    }

}