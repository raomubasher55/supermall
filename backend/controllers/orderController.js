const Order = require("../models/orderModel");
const userModel = require('../models/userModel');
const stripe = require("stripe")(
  "sk_test_51PsqrxFXuPSbCmw1MR2yGCfat7x2Q0QGFvwqayTIRiiGiZkpQ1buBZ8OLTYjIaYnqusuJ02voF7jIZT042kp5lIj00XEpTQOvO"
);

const createOrder = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const orderData = {
      ...req.body,
      userId, // Assuming your order schema has a `user` field
    };

    const order = await Order.create(orderData);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // Assuming the order ID is passed as a URL parameter
    const { status } = req.body; // The new status should be passed in the request body

    // Validate the status
    if (!["unpaid", "paid"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Allowed values are 'unpaid' or 'paid'.",
      });
    }

    // Find the order and update the status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.user.user._id;
  const allOrders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, allOrders , count: allOrders.length });
};

const getPaidOrders = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const paidOrders = await Order.find({ userId: userId, status: "paid" });
    res.status(200).json({
      success: true,
      count: paidOrders.length,
      data: paidOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch paid orders",
      error: error.message,
    });
  }
};

const getUnpaidOrders = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const unpaidOrders = await Order.find({ userId: userId, status: "unpaid" });
    res.status(200).json({
      success: true,
      count: unpaidOrders.length,
      data: unpaidOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch unpaid orders",
      error: error.message,
    });
  }
};
const getFreezeOrders = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const freezeOrders = await Order.find({ userId: userId, status: "freeze" });
    res.status(200).json({
      success: true,
      count: freezeOrders.length,
      data: freezeOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch freeze orders",
      error: error.message,
    });
  }
};

//Get all Order
const getAllOrder = async (req, res) => {
  const { status } = req.query; // Get the status from query params
  const userId = req.user.user._id; // Assuming req.user contains the logged-in user info

  try {
    // Fetch orders for the logged-in user and filter by status (paid)
    const orders = await Order.find({ status: status, userId: userId });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error); // Log the error for debugging
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Payment
const checkout = async (req, res) => {
  try {
    const { package, name, image, task, commission, id } = req.body;
    const userId = req.user.user._id;

    if (!package || isNaN(package)) {
      return res.status(400).json({ error: "Invalid package amount" });
    }

    // Find the existing order by ID
    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const lineItems = [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: name || "custom Desposit",
            images: [image],
          },
          unit_amount: package * 100, // Convert package amount to cents
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // success_url: `https://supermall.digital/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `https://supermall.digital/fail?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/fail?session_id={CHECKOUT_SESSION_ID}`,
    });

    existingOrder.status = "paid"; // Initial status
    existingOrder.task = task;
    existingOrder.commission = commission;
    await existingOrder.save();

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.balance = (Number(user.balance) || 0) + Number(package); // Assuming 'balance' is a field in your User schema
    await user.save();

    res.json({ id: session.id });
  } catch (error) {
    if (error.type === "StripeCardError" && error.code === "card_declined") {
      return res.status(400).json({
        success: false,
        message: "Payment failed due to insufficient funds",
      });
    } else {
      console.error("Error creating payment:", error);
      return res.status(400).json({
        success: false,
        message: `Payment failed due to ${error.message}`,
      });
    }
  }
};

module.exports = {
  updateOrderStatus,
  createOrder,
  getAllOrders,
  getPaidOrders,
  getUnpaidOrders,
  getAllOrder,
  checkout,
  getFreezeOrders,
};
