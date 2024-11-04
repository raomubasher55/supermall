const cron = require("node-cron");
const Order = require("../models/orderModel"); // Assuming the model path

// Schedule a cron job to run every minute for testing purposes
cron.schedule("* * * * *", async () => {
  try {
    // const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // One minute ago
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // One hour ago

    // Find all unpaid orders that were created more than 1 minute ago
    const unpaidOrders = await Order.find({
      status: "unpaid",
      createdAt: { $lte: oneHourAgo },
    });

    // Update status of those orders to 'freeze'
    for (const order of unpaidOrders) {
      order.status = "freeze";
      await order.save();
    }
  } catch (error) {
    console.log("Error updating orders:", error);
  }
});
