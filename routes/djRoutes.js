const express = require("express");
const djController = require("../controllers/djController");

const router = express.Router();

router.get("/", djController.getAllDJs);
router.get("/:id", djController.getDJById);
router.post("/", djController.createDJ);
router.patch("/:id", djController.updateDJ);
router.delete("/:id", djController.deleteDJ);

module.exports = router;
