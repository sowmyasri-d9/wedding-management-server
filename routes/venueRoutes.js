const express = require("express");
const venueController = require("../controllers/venueController");

const router = express.Router();

router.get("/", venueController.getAllVenues);
router.get("/:id", venueController.getVenueById);
router.post("/", venueController.createVenue);
router.patch("/:id", venueController.updateVenue);
router.delete("/:id", venueController.deleteVenue);

module.exports = router;
