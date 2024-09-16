const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

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
