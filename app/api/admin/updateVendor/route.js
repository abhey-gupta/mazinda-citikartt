import Vendor from "@/models/Vendor";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        const { updatedVendor } = await req.json();
        // Connecting to database
        await connectDB()

        // Checking if the user already exists
        let vendor = await Vendor.findOne({ _id: updatedVendor._id });

        if (vendor) {
            
            vendor.name = updatedVendor.name;
            vendor.number = updatedVendor.number;
            vendor.alternateNumber = updatedVendor.alternateNumber;
            vendor.password = updatedVendor.password;
            vendor.imageURI = updatedVendor.imageURI;
            vendor.deliveryLocations = updatedVendor.deliveryLocations;
            vendor.deliveryCharges = updatedVendor.deliveryCharges;
            vendor.minOrders = updatedVendor.minOrders;

            await vendor.save();
            return NextResponse.json({ success: true, message: "Vendor updated successfully" });
        } else {
            return NextResponse.json({ success: false, message: "Vendor doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the vendor : " + error });
    }
}

