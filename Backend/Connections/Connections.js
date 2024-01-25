const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose
      .connect("mongodb+srv://krayush2605:Ram2024@todo.mj9myoe.mongodb.net/")
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

connection();
