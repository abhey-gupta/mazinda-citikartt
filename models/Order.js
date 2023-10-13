const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    vendorId: { type: String, required: true },
    products: { type: Object, required: true },
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    instructions: { type: String },
    paymentInfo: { type: Object },
    paymentMethod: { type: String },
    paymentLink: { type: String },
    status: { type: String, default: 'Processing' },
    isDelivered: { type: Boolean, default: false },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);