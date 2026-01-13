const express = require("express");
const weddingTypeController = require("../controllers/weddingTypeController");

const router = express.Router();

router.get("/", weddingTypeController.getAllWeddingTypes);
router.get("/:id", weddingTypeController.getWeddingTypeById);
router.post("/", weddingTypeController.createWeddingType);
router.patch("/:id", weddingTypeController.updateWeddingType);
router.delete("/:id", weddingTypeController.deleteWeddingType);

module.exports = router;
