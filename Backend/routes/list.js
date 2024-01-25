const router = require("express").Router();
const User = require("../models/users");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
  try {
    const { id, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ id, body, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      existingUser.save().then(() => res.status(200).json({ list }));
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
