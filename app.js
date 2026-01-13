const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const djRoutes = require("./routes/djRoutes");
const foodCatererRoutes = require("./routes/foodCatererRoutes");
const userRoutes = require("./routes/userRoutes");
const venueRoutes = require("./routes/venueRoutes");
const weddingTypeRoutes = require("./routes/weddingTypeRoutes");
const photographyRoutes = require("./routes/photographyRoutes");
const decorationRoutes = require("./routes/decorationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/djs", djRoutes);
app.use("/api/food-caterers", foodCatererRoutes);
app.use("/api/users", userRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/wedding-types", weddingTypeRoutes);
app.use("/api/photography", photographyRoutes);
app.use("/api/decorations", decorationRoutes);
app.use("/api/booking", bookingRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));