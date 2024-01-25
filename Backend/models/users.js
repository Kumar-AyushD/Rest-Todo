const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    default: true,
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "list",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
