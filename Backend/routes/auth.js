const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, username, password: hashPassword });

    await user.save().then(() => {
      res.status(200).json({ user });
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "User already exists." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Please Sign Up first" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password.toString(),
      user.password.toString()
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(400).json({ message: "Please Sign up Ayush" });
  }
});

module.exports = router;
