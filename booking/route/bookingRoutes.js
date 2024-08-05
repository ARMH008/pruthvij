const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router.get("/checkout-session/:id", bookingController.getCheckoutSession);
router.get("/booking", bookingController.createBookingCheckout);
router.get("/bookingstat", bookingController.getbookingstats);
router.get("/getallbooking", bookingController.getallbookings);
router.use(authController.protect);
router.get("/mypayments", bookingController.getMyEvents);
module.exports = router;
