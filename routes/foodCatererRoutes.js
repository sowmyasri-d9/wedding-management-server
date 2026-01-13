const express = require("express");
const foodCatererController = require("../controllers/foodCatererController");

const router = express.Router();

router.get("/", foodCatererController.getAllFoodCaterers);
router.get("/:id", foodCatererController.getFoodCatererById);
router.post("/", foodCatererController.createFoodCaterer);
router.patch("/:id", foodCatererController.updateFoodCaterer);
router.delete("/:id", foodCatererController.deleteFoodCaterer);

module.exports = router;
