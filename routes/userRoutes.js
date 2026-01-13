const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Example routes
router.get("/", authenticate, userController.getUserDetails);
router.get("/:id", userController.getUserById);
router.get("/email/:email", userController.getUserByEmail);
router.patch("/:userId/make-admin", userController.updateUserRole);
router.patch("/", authenticate, userController.updateUserDetails);
router.post("/calculate-total-cost", authenticate, userController.calculateTotalCost);

// Admin route
router.get("/admin", authenticate, isAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin panel." });
});

module.exports = router;

//