const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ContractSchema = new mongoose.Schema(
  {
    service: { type: ObjectId, ref: "Service", required: true }, 
    user: { type: ObjectId, ref: "User", required: true },
    provider: { type: ObjectId, ref: "User", required: true }, 
    status: { type: String, default: "pending" }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  },
  { timestamps: true }
);

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;
