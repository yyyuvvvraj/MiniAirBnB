const mongoose = require("mongoose");
const User = require("./models/user");

// 👇 CHANGE THIS
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const resetPassword = async () => {
  await mongoose.connect(MONGO_URL);

  const user = await User.findOne({ email: "abcd@gmail.com" });

  if (!user) {
    console.log("User not found");
    process.exit();
  }

  await user.setPassword("newpassword123");
  await user.save();

  console.log("✅ Password reset successful");
  process.exit();
};

resetPassword();
