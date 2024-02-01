const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: true,
    required: true,
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "list",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
