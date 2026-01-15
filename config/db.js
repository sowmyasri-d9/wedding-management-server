const mongoose = require("mongoose");
const DEFAULT_ADMIN = require("../controllers/authController")

const connectDB = async () => {
  const LIVE_URL = "mongodb+srv://sowmya:Sowmya%401234@loginschema.6wuwv.mongodb.net/LogInSchema"

  try {
    await mongoose.connect(LIVE_URL);
    await DEFAULT_ADMIN.createAdminUser();
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
