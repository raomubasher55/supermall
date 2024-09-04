const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed'], // Include 'pending' and other statuses
        default: 'pending',
    },
});

module.exports = mongoose.model("Plan", planSchema);
