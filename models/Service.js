const mongoose = require("mongoose");

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
