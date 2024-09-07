const productModel = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const Purchase = require("../models/purchaseModel");
// const stripe = require('stripe')('sk_test_51PrdT1P3NC7isVfIZRQyiGTYXCgqfd0ehOkxwagOMGDxZjDQ0bEYZisOUelU1jzpBajJQD552SoYw9qeuvaEyTL700FECWYcsZ');
const stripe = require("stripe")(
  "sk_test_51PsqrxFXuPSbCmw1MR2yGCfat7x2Q0QGFvwqayTIRiiGiZkpQ1buBZ8OLTYjIaYnqusuJ02voF7jIZT042kp5lIj00XEpTQOvO"
);

//create Prpduct
const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { name, slug, description, price, category, quantity, shipping } =
      req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const product = new productModel({
      name,
      quantity,
      category,
      description,
      price,
      shipping,
      slug: slugify(name),
      image: "images/" + req.file.filename,
    });
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product ADd Successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      // .populate("category")
      // .select("-image")
      // .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Product",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting all Products",
    });
  }
};

//Get Single Product
const getSingleProducts = async (req, res) => {
  try {
    const products = await productModel.findOne({ slug: req.params.slug });
    // .populate("category");
    return res.status(200).json({
      success: true,
      message: "Single Product",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting Single Products",
    });
  }
};

//Get images of Products
const getImages = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.image) {
      return res.status(200).json({
        success: true,
        message: "Image Found Successfully",
        Image: product.image,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
  } catch (error) {
    const statusCode = error instanceof TypeError ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: "Error occurred while getting images of the product",
      error: error.message,
    });
  }
};

//Delete the Product
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Produt not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Delete Scuccessfully",
    });
  } catch (error) {
    const statusCode = error instanceof TypeError ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: "Error occurred while delteing of the product",
      error: error.message,
    });
  }
};

//update the product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const updateFields = {};
    if (!name) {
      return res.send("name is required");
    }
    // Build the update object
    if (name) updateFields.name = name;
    if (name) updateFields.slug = slugify(name);
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (quantity) updateFields.quantity = quantity;
    if (shipping !== undefined) updateFields.shipping = shipping;

    // Handle image upload if a new image is provided
    if (req.file) {
      updateFields.image = "images/" + req.file.filename;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      { $set: updateFields },
      {
        new: true, // Return the modified document rather than the original
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct, // Corrected variable name here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the product",
      error: error.message,
    });
  }
};

//filter Products
const filterProduct = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body; // Provide default values if undefined
    console.log("Received data:", { checked, radio }); // Add this line for debugging
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the product",
      error: error.message,
    });
  }
};

//product count
const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    return res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting counnt Products",
    });
  }
};
//list product base on  page
const productList = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const productsList = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      productsList,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting Product/list Products",
    });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error occurred while searching the products",
    });
  }
};

const createPayment = async (req, res) => {
  try {
    const { package, name, image, task, commission } = req.body; // Assuming 'package' contains the amount to be charged
    const userId = req.user.user._id; // Retrieve the user ID from the middleware

    console.log(commission);

    if (!package || isNaN(package)) {
      return res.status(400).json({ error: "Invalid package amount" });
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
      success_url: `https://supermall.digital/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://supermall.digital/fail?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Save the product with 'unpaid' status
    const newPurchase = new Purchase({
      userId: userId,
      productName: name,
      image: image,
      amount: package,
      task: task,
      commission: commission,
      status: "unpaid", // Initial status
      sessionId: session.id, // Save the session ID for later reference
    });

    await newPurchase.save();

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.balance = (user.balance || 0) + package; // Assuming 'balance' is a field in your User schema
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

//update-purchase
const updatePurchase = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    const purchase = await Purchase.findOneAndUpdate(
      { sessionId: sessionId },
      { status: status }, // Update with the passed status
      { new: true }
    );

    if (!purchase) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase not found" });
    }

    res.status(200).json({ success: true, details: purchase });
  } catch (error) {
    console.error("Error updating purchase:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Get all Order
const getAllOrder = async (req, res) => {
  const { status } = req.query; // Get the status from query params
  const userId = req.user.user._id; // Assuming req.user contains the logged-in user info

  try {
    console.log('Status:', status); // Log status
    console.log('User ID:', userId); // Log user ID

    // Fetch orders for the logged-in user and filter by status (paid)
    const orders = await Purchase.find({ status: status, userId: userId });


    console.log('Orders Found:', orders); // Log the fetched orders

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



const withdraw = async (req, res) => {
  {
    try {
      const { userId, amount } = req.body;

      console.log(userId, amount);

      // Validate amount
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      // Find user and get their Stripe account ID
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Ensure user has sufficient balance
      if (user.balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Create a payout
      const payout = await stripe.payouts.create(
        {
          amount: amount * 100, // Convert amount to cents
          currency: "INR", // Set the currency
          method: "instant", // Use 'standard' for regular payouts
          // destination: 'account_id', // If using separate connected accounts
        },
        {
          stripeAccount: user.stripeAccountId, // Stripe account ID of the connected account
        }
      );

      // Update user balance
      user.balance -= amount;
      await user.save();

      res.status(200).json({ message: "Withdrawal successful", payout });
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const handleCheckoutSessionCompleted = async (session) => {
  try {
    const userId = req.user.user._id;
    const productId = session.metadata.productId;

    // Find user and update database
    const user = await userModel.findById(userId);
    if (!user) return;

    // Save purchase details
    await Purchase.create({
      user: userId,
      product: productId,
      amount: session.amount_total / 100,
      status: "completed",
      date: new Date(),
    });
  } catch (error) {
    console.error("Error handling checkout session:", error);
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Update payment details in the database
    const paymentDetails = {
      sessionId: session.id,
      customerEmail: session.customer_email,
      amount: session.amount_total / 100, // Convert back to original amount
      status: session.payment_status,
      // Add other details as needed
    };

    // Example: Update PaymentModel with payment details
    // await PaymentModel.findOneAndUpdate({ sessionId }, paymentDetails, { upsert: true });

    res.json({ success: true });
  } catch (error) {
    console.error("Error handling payment success:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  getImages,
  deleteProduct,
  updateProduct,
  filterProduct,
  productCount,
  productList,
  searchProducts,
  createPayment,
  handlePaymentSuccess,
  handleCheckoutSessionCompleted,
  updatePurchase,
  getAllOrder,
  withdraw,
};
