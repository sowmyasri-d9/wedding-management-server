const express = require("express");
const router = express.Router();
const photographyController = require("../controllers/photographyController");

router.get("/", photographyController.getAllPhotography);
router.get("/:id", photographyController.getPhotographyById);
router.post("/", photographyController.createPhotography);
router.patch("/:id", photographyController.updatePhotography);
router.delete("/:id", photographyController.deletePhotography);

module.exports = router;
