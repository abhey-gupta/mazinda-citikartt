import Vendor from "@/models/Vendor";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

// import CryptoJS from "crypto-js";

export async function POST(req) {
    try {
        const { vendorData } = await req.json();
        const { name, number, alternateNumber, password, category, imageURI, deliveryLocations, deliveryCharges, minOrders } = vendorData;
        await connectDB()
        let vendor = await Vendor.findOne({ name: name, number: number })

        if (!vendor) {
            await Vendor.create({ name, number, alternateNumber, category, password, imageURI, deliveryLocations, deliveryCharges, minOrders });
            // await Vendor.create({ name, number, alternateNumber, password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(), deliveryLocations, deliveryCharges, foodTypes });
            return NextResponse.json({ success: true, message: "Vendor created successfully"});
        } 
        
        else {
            return NextResponse.json({ success: false, message: "Vendor already exists" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the Vendor : " + error });
    }
}