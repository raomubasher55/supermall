const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Consider making email unique if necessary
    },
    mobile: {
      type: Number, 
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Number,
      default: 0,
    },
    bankDetails: {
      bankName: {
        type: String,
        required: false,
        enum: [
          "Canara Bank",
          "DCB Bank",
          "Federal Bank",
          "HDFC Bank",
          "PN Bank",
          "Bank of India",
          "ICICI Bank",
          "Syndicate Bank",
          "Karur Vysya Bank",
          "Union Bank of India",
          "Kotak M Bank",
        ],
      },
      realName: {
        type: String,
        required: false,
        trim: true,
      },
      accountNumber: {
        type: String,
        required: false,
        unique: true,
        trim: true,
      },
      emailAddress: {
        type: String,
        required: false,
        trim: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
      },
      contactNumber: {
        type: String,
        required: false,
        trim: true,
        match: [/^\d{10}$/, "Please fill a valid contact number"],
      },
      ifsc: {
        type: String,
        required: false,
        trim: true,
        match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please fill a valid IFSC code"],
      },
      password: {
        type: String,
        minlength: 6,
      },
    },
    currentPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: false, // Make it optional
  },
    role: {
      type: Number,
      default: 0, // 0 for regular user, 1 for admin
      enum: [0, 1], // Defining possible values for role
    },
    balance: {
      type: Number,
      default: 0, // Default balance, if any
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
