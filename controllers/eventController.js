const catchAsync = require("../utils/catchAsync");
const dotenv = require("dotenv");
const AppError = require("../utils/apperror");

const Event = require("./../models/eventModel");
const User = require("../models/userModel");

const Email = require("../utils/email");
dotenv.config({ path: "./config.env" });

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
/* const moment = require("moment"); */
const moment = require("moment-timezone");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image!! please upload an image", 400));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
exports.uploadimage = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 3,
  },
]);
exports.resizeProductImage = catchAsync(async (req, res, next) => {
  // Check if req.files exists
  if (!req.files || !req.files.imageCover || !req.files.images) {
    return next(new AppError("No images found!", 400));
  }

  // Collect all files to be processed
  const filesToProcess = [];

  // Add imageCover to filesToProcess
  const imageCoverPath = req.files.imageCover[0].path;
  const resizedImageCoverPath = `./public/temp/${req.files.imageCover[0].filename}-resized.jpeg`;
  filesToProcess.push({
    originalPath: imageCoverPath,
    resizedPath: resizedImageCoverPath,
    isCover: true, // Flag to indicate it's a cover image
  });

  // Add images to filesToProcess
  req.files.images.forEach((image, index) => {
    const imagePath = image.path;
    const resizedImagePath = `./public/temp/${image.filename}-resized.jpeg`;
    filesToProcess.push({
      originalPath: imagePath,
      resizedPath: resizedImagePath,
      isCover: false, // Flag to indicate it's not a cover image
    });
  });

  // Resize and upload all images
  const uploadPromises = filesToProcess.map(async (file) => {
    await sharp(file.originalPath)
      .resize({ width: 474, height: 497 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(file.resizedPath);

    try {
      const result = await cloudinary.uploader.upload(file.resizedPath, {
        resource_type: "auto",
      });

      // Determine where to store the URL based on the file type
      if (file.isCover) {
        // It's a cover image
        req.body.imageCover = result.secure_url;
        console.log("Cloudinary URL for imageCover:", result.secure_url);
      } else {
        // It's not a cover image, store in the images array
        req.body.images = req.body.images || [];
        req.body.images.push(result.secure_url);
        console.log("Cloudinary URL for image:", result.secure_url);
      }
    } catch (err) {
      return next(new AppError(`Error uploading image to Cloudinary`, 500));
    }
  });

  // Wait for all images to be processed and uploaded
  await Promise.all(uploadPromises);

  // Call next middleware
  next();
});

exports.getAllEvent = catchAsync(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    status: "success",
    results: events.length,
    res: res.locals.user,
    data: {
      events,
    },
  });
});

/* exports.createvent = catchAsync(async (req, res, next) => {
  // Create the new event
  const newEvent = await Event.create(req.body);

  const users = await User.find();
  const emailPromises = users.map(async (user) => {
    const url = `http://localhost:5173/event/${newEvent._id}`;
    const emailInstance = new Email(user, url);
    return emailInstance.sendEventNotification(newEvent); // Return the promise
  });

  // Wait for all emails to be sent
  await Promise.all(emailPromises);

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      newEvent,
      user: res.locals.user,
    },
  });
});
 */
exports.createvent = catchAsync(async (req, res, next) => {
  try {
    // Convert the date and time to Indian format (IST)
    const body = { ...req.body };

    // Parse and adjust registration datetime
    const registrationDateTime = moment(
      body.registrationdate,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");
    const registrationTime = moment(body.registrationdate).format("HH:mm A"); // Extract time from the date
    body.registrationdate = moment
      .tz(`${registrationDateTime} ${registrationTime}`, "Asia/Kolkata")
      .format();

    // Parse and adjust end datetime
    const endDateTime = moment(body.enddate, "YYYY-MM-DD").format("YYYY-MM-DD");
    const endTime = moment(body.enddate).format("HH:mm A"); // Extract time from the date
    body.enddate = moment
      .tz(`${endDateTime} ${endTime}`, "Asia/Kolkata")
      .format();

    // Parse and adjust event datetime
    const eventDateTime = moment(body.eventdate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    const eventTime = moment(body.eventdate).format("HH:mm A"); // Extract time from the date
    body.eventdate = moment
      .tz(`${eventDateTime} ${eventTime}`, "Asia/Kolkata")
      .format();

    // Create the new event with the converted date and time
    const newEvent = await Event.create(body);

    // Send response
    res.status(200).json({
      status: "success",
      data: {
        newEvent,
        user: res.locals.user,
      },
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

exports.updateevent = catchAsync(async (req, res, next) => {
  const doc = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("No document found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.uploadwimage = upload.fields([
  {
    name: "winnersimages",
    maxCount: 3,
  },
]);
exports.uploadWinnersImages = async (req, res, next) => {
  try {
    // Check if req.files exists
    if (!req.files || !req.files.winnersimages) {
      return res.status(400).json({ error: "No winners images found!" });
    }

    const eventId = req.params.id; // Assuming eventId is accessible from the request

    // Fetch event from the database
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found!" });
    }

    // Collect all files to be processed
    const filesToProcess = [];

    // Add winnersimages to filesToProcess
    req.files.winnersimages.forEach((image, index) => {
      const imagePath = image.path;
      const resizedImagePath = `./public/temp/${image.filename}-resized.jpeg`;
      filesToProcess.push({
        originalPath: imagePath,
        resizedPath: resizedImagePath,
      });
    });

    // Resize and upload all images
    const uploadPromises = filesToProcess.map(async (file) => {
      await sharp(file.originalPath)
        .resize({ width: 474, height: 497 })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(file.resizedPath);

      const result = await cloudinary.uploader.upload(file.resizedPath, {
        resource_type: "auto",
      });

      // Push the Cloudinary URL to winnersimages array
      event.winnersimages.push(result.secure_url);
    });

    // Wait for all images to be processed and uploaded
    await Promise.all(uploadPromises);

    // Save the updated event with the new winner image URLs
    await event.save();

    return res
      .status(200)
      .json({ message: "Winners images uploaded successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteevent = catchAsync(async (req, res, next) => {
  const deltevent = await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: "Event has been succesfully deleted",
  });
});

exports.generatePDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:5173/event/${req.params.id}`, {
      waitUntil: "networkidle2",
    });

    //await page.setViewport(dimensions);
    await page.setViewport({ width: 1050, height: 1050 });

    // Wait for all images to load
    await page.waitForSelector("img");

    // Remove unnecessary elements
    await page.evaluate(() => {
      const navElements = document.querySelectorAll("nav");
      navElements.forEach((nav) => nav.remove());

      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => button.remove());

      const links = document.querySelectorAll("[href^='/']");
      links.forEach((link) => link.remove());
    });

    // Generate PDF with proper dimensions and styles
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Set the appropriate headers for download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="report.pdf"');

    // Send the PDF file as response
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF report");
  }
};

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});
exports.searchevents = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.name; // Change 'search' to 'name'

  // Perform a case-insensitive search for users with names containing the query
  const users = await Event.find({
    name: { $regex: new RegExp(searchQuery, "i") },
  });
  res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
});
