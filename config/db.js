const mongoose = require("mongoose");
const DEFAULT_ADMIN = require("../controllers/authController")

const connectDB = async () => {
  // const LIVE_URL = "mongodb+srv://slemach:Slemach-321@cluster0.pnqsz.mongodb.net/?appName=Cluster0"
  const LIVE_URL = "mongodb+srv://sowmya:Sowmya%401234@loginschema.6wuwv.mongodb.net/?appName=LogInSchema"
  // const LIVE_URL = "mongodb+srv://sowmya:Sowmya%401234@loginschema.6wuwv.mongodb.net/?retryWrites=true&w=majority&appName=LogInSchema"

  try {
    await mongoose.connect(LIVE_URL); // Removed deprecated options
    console.log("✅ MongoDB Connected");
    console.log("Updated URI");
    await DEFAULT_ADMIN.createAdminUser();
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
