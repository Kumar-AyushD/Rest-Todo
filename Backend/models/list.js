const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  id: {
    type: Date,
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
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("List", mySchema);
