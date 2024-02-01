const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  body: [
    {
      task: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("List", mySchema);
