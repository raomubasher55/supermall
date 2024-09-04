const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productName: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'paid'], // Include both 'unpaid' and 'paid' as valid enum values
        default: 'unpaid' // Default to 'unpaid' when a new purchase is created
    },
    sessionId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    task: {
        type: Number,
        required: false // or set to true if task is mandatory
    },
    commission: {
        type: Number,
        required: false // or set to true if task is mandatory
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
