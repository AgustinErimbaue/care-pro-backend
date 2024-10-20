const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String },
    username: { type: String, required: true, unique: true },
    profileImage: { type: String },
    tokens: [],
    services: [{ type: ObjectId, ref: "Service" }],
    contracts: [{ type: ObjectId, ref: "Contract" }],
    isServiceProvider: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.index({
  usernamename: "text",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
