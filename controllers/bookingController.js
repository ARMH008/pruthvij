// bookingController.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Event = require("./../models/eventModel");
const catchAsync = require("./../utils/catchAsync");

const Booking = require("../models/bookingModel");
const AppError = require("./../utils/apperror");
const ExcelJS = require("exceljs");
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:5173/?event=${req.params.id}&user=${req.user.id}&price=${event.price}`,
    cancel_url: `${req.protocol}://localhost:5173/event/${event.id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${event.name} event`,
            description: event.name,
          },
          unit_amount: event.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    billing_address_collection: "required", // Require customer name and address
    locale: "auto", // Automatically localize checkout page
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res) => {
  try {
    // Extract event, user, and price from the query parameters
    const { event, user, price } = req.query;

    // Validate the presence of required parameters
    if (!event || !user || !price) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    // Store the data in the database
    await Booking.create({ event, user, price });

    // Send a success response
    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing data:", error);
    // Handle errors
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.getallbookings = catchAsync(async (req, res, next) => {
  const doc = await Booking.find();

  if (!doc) {
    return next(new AppError("sorry there are no bookings", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getbookingstats = catchAsync(async (req, res, next) => {
  const stats = await Booking.aggregate([
    {
      $match: {
        event: { $ne: null },
      },
    },
    {
      $lookup: {
        from: "events",
        localField: "event",
        foreignField: "_id",
        as: "eventDetails",
      },
    },
    {
      $group: {
        _id: "$eventDetails.name",
        numofusers: { $sum: 1 },
        totalRevenue: { $sum: "$price" },
        avgPrice: { $avg: "$price" },
      },
    },
    {
      $match: {
        _id: { $ne: [] }, // Remove entries where _id is an empty array
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      doc: stats,
    },
  });
});

exports.getMyEvents = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find Events with the returned IDs
  const eventIDs = bookings.map((el) => el.event);
  const events = await Event.find({ _id: { $in: eventIDs } });

  res.status(200).render("overview", {
    title: "My Events",
    events,
  });
});

exports.createreport = catchAsync(async (req, res, next) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("bookingsdata");

  const data = Booking.find();
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
