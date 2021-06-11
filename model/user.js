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
    },
    adult: {
      type: Boolean,
    },
    age: {
      type: Number,
    },
    contactNumber: [
      {
        type: String,
      },
    ],
    address: {
      line1: {
        type: String,
      },
      houseNumber: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("user", userSchema);
