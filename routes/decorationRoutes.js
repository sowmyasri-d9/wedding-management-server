const express = require("express");
const router = express.Router();
const decorationController = require("../controllers/decorationController");

router.get("/", decorationController.getAllDecorations);
router.get("/:id", decorationController.getDecorationById);
router.post("/", decorationController.createDecoration);
router.patch("/:id", decorationController.updateDecoration);
router.delete("/:id", decorationController.deleteDecoration);

module.exports = router;