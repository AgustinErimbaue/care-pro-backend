const mongoose = require("mongoose");
const { ObjectId } = require('mongoose');
const User = require('./User');

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    provider: { type: ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
