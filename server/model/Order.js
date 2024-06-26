const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: {
    type: Number,
    required: true
  },
  waiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Waiter',
    required: true
  },
  items: [{
    cuisine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cuisine'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Paid'],
    required: true
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['Cash','UPI'],
    },
    transactionId: String
  },
  orderPlacedTime: {
    type: Date,
    default: Date.now
  },
  orderCompletedTime: {
    type: Date
  }
});

module.exports = mongoose.model("Order", orderSchema);