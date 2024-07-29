const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    tokens: [],
    services: [{ type: ObjectId, ref: "Service" }],
    isServiceProvider: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.index({
  username: "text",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
