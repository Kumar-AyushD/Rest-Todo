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

router.patch("/updateTask/:id", async (req, res) => {
  try {
    const { body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingList = await List.findById(req.params.id);
    if (!existingList) {
      return res.status(404).json({ message: "List not found" });
    }
    existingList.body = existingList.body.concat(body);
    existingList.user = existingUser._id;

    await existingList.save().then(() => {
      res.status(200).json({ message: "List updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteAllTasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedLists = await List.deleteMany({ user: userId });

    if (deletedLists.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No lists found for the specified user" });
    }

    res
      .status(200)
      .json({ message: `Deleted all lists for user with id: ${userId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id });
    // console.log(req.params.id);
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {}
});

router.delete("/deleteOneTask/:userId/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const updatedList = await List.findOneAndDelete({
      user: userId,
      "body._id": taskId,
    });

    if (!updatedList) {
      return res
        .status(404)
        .json({ message: "Task not found for the specified user and task ID" });
    }

    res.status(200).json({ message: `Deleted task with ID: ${taskId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
