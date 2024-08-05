const express = require("express");

const sharp = require("sharp");

const multer = require("multer");

const catchAsync = require("./../utils/catchAsync");

const AppError = require("./../utils/apperror");

const User = require("./../models/userModel");
const Event = require("../models/eventModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
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
// exports.uploadUserPhoto = upload.single("photo");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
exports.resizeUserImage = catchAsync(async (req, res, next) => {
  // Call the upload middleware to handle file upload
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return next(new AppError("Failed to upload image.", 400));
    }

    // Check if req.file exists
    if (!req.file) {
      return next(new AppError("No image found!", 400));
    }

    const fileToProcess = req.file;

    const resizedImagePath = `./public/temp/${fileToProcess.filename}-resized.jpeg`;

    // Resize and upload the image
    await sharp(fileToProcess.path)
      .resize({ width: 474, height: 497 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(resizedImagePath);

    try {
      const result = await cloudinary.uploader.upload(resizedImagePath, {
        resource_type: "auto",
      });

      // Store the URL based on the file type
      req.body.photo = result.secure_url;
      console.log("Cloudinary URL for user:", result.secure_url);

      // Call next middleware
      next();
    } catch (err) {
      return next(new AppError(`Error uploading image to Cloudinary`, 500));
    }
  });
});
exports.searchUsers = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.name; // Change 'search' to 'name'

  // Perform a case-insensitive search for users with names containing the query
  const users = await User.find({
    name: { $regex: new RegExp(searchQuery, "i") },
  });
  res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
});

const filterObj = (obj, ...AllowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (AllowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "Do not include password fields in this route. Use the update password route instead.",
        400
      )
    );
  }

  const filterObject = filterObj(req.body, "name", "email");

  if (req.file) {
    // If a file is uploaded, update the photo field with the Cloudinary URL
    filterObject.photo = req.body.photo;
  }

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterObject, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.deleteme = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("no doc found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const doc = await User.find();

  if (!doc) {
    return next(new AppError("sorry no users found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
