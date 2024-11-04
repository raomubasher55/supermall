const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order_id: { type: String, required: true }, // Fixed typo in 'required'
    name: { type: String },
    image: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["unpaid", "paid" , "freeze"], default: "unpaid" },
    createdAt: { type: Date, default: Date.now },
    task: { type: Number , default: 0 },
    commission: { type: Number },
  },
  { timestamps: true } // Enable timestamps for 'createdAt' and 'updatedAt'
);
    
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
