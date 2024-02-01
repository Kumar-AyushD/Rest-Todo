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
      res.status(200).json({ message: "SignUp Successful" });
    });
  } catch (error) {
    res.status(200).json({ message: "User already exists." });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({ message: "Please Sign Up first" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password.toString(),
      user.password.toString()
    );
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Wrong Password" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(200).json({ message: "Internal Server Error" });
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.list.length > 0) {
      res.status(200).json({ username: user.username });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
