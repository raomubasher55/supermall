const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,   
    },

    image: {
        type: String,
        required: true,
    },
    shipping: {
        type: Boolean,
        required: true,
        default: false,
    },
    quantity: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
