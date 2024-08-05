const express = require("express");
const eventController = require("./../controllers/eventController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/searchevent", eventController.searchevents);
router
  .route("/")
  .get(authController.isLoggedIn, eventController.getAllEvent)
  .post(
    // authController.protect,
    // authController.restrictTo("admin"),
    /*  eventController.uploadimage,
    eventController.resizeProductImage, */
    eventController.createvent
  );

router
  .route("/:id")
  .get(eventController.getEvent)
  .patch(eventController.updateevent)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    eventController.deleteevent
  );
// router.route("/:id").get(eventController.getEvent);

router
  .route("/:id/winnerimages")
  .patch(eventController.uploadwimage, eventController.uploadWinnersImages);

router
  .route("/:id/generate-pdf")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    eventController.generatePDF
  );

module.exports = router;
