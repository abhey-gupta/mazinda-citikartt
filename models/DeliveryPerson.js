const mongoose = require('mongoose');

const DeliveryPersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    alternateNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    ordersHistory: {type: Array, default: []},
    currentOrders: {type: Array, default: []},
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("DeliveryPerson", DeliveryPersonSchema);