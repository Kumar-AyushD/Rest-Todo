const router = require("express").Router();
const User = require("../models/users");
const List = require("../models/list");

router.post("/addOrUpdateTask", async (req, res) => {
  try {
    const { id, body, _id } = req.body;

    const existingUser = await User.findOne({ _id });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a task with the same id already exists
    const foundListQuery = List.findOne({ user: existingUser._id, id });
    const foundList = await foundListQuery.exec();

    if (foundList) {
      // If the task exists, update it
      foundList.body = foundList.body.concat(body);
      await foundList.save();
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      // If the task doesn't exist, add a new task
      const list = new List({ id, body, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      existingUser.save().then(() => res.status(200).json({ message: "Task added successfully" }));
    }
  } catch (error) {
    console.error(error);
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

    const updatedList = await List.findOneAndUpdate(
      {
        user: userId,
        "body._id": taskId,
      },
      {
        $pull: { body: { _id: taskId } },
      },
      { new: true }
    );

    if (!updatedList) {
      return res
        .status(404)
        .json({ message: "Task not found for the specified user and task ID" });
    }

    if (updatedList.body.length === 0) {
      await List.findOneAndDelete({ user: userId });
      return res.status(200).json({
        message: `Deleted task with ID: ${taskId} and the entire document`,
      });
    }

    res
      .status(200)
      .json({ message: `Deleted task with ID: ${taskId}`, updatedList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/updateTask/:userId/:taskId", async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  const { task, completed } = req.body.body[0];

  try {
    const updatedUser = await List.findOneAndUpdate(
      { user: userId, "body._id": taskId },
      {
        $set: {
          "body.$.task": task,
          "body.$.completed": completed,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User or task not found" });
    }

    res.json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
