const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    alternateNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String },
    imageURI: { type: String },
    deliveryLocations: { type: Array, required: true },
    deliveryCharges: { type: Object },
    minOrders: { type: Object },
    openStatus: { type: Boolean, default: true },
    menu: {type: Object, default: {}},
    ordersHistory: {type: Array, default: []},
    currentOrders: {type: Array, default: []},
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Vendor", VendorSchema);