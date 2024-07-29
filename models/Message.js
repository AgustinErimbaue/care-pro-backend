const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const MessageSchema = new mongoose.Schema(
  {
    senderId: { type: ObjectId, ref: "User", required: true },
    recipientId: { type: ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
