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
    // category: {
    //     type: mongoose.Schema.Types.ObjectId, // Correctly reference ObjectId
    //     ref: 'Category', // Reference to Category model
    //     required: true, // Ensure this field is required if necessary
    // },
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
