const express = require("express");
const router = express.Router();
const booking = require("../controllers/bookingController");

router.get("/", booking.getAllBookings);
router.get("/:id", booking.getBookingById);
router.get("/bookings/bks", booking.getBookingByEmail);
router.post("/", booking.createBooking);
router.patch("/:id", booking.updateBooking);
router.delete("/:id", booking.deleteBooking);

module.exports = router;