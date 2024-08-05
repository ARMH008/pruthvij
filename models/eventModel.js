const mongoose = require("mongoose");

const slugify = require("slugify");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: [true, "A EVENT MUST HAVE A NAME"],
      unique: [true],
      maxlength: [40, "A event must not have length greater than 40"],
    },
    /*  slug: String, */
    Teamsize: {
      type: Number,
      // required: [true, "A event must have a team size"],
    },
    description: {
      type: String,
    },
    registrationdate: {
      type: Date,
      default: Date.now,
    },

    enddate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "End date must be in the future",
      },
    },

    eventdate: {
      type: Date,
    },
    location: {
      type: String,
      // required: [true, "An event must be held at a particular location"],
    },
    timing: {
      type: String,
    },
    price: {
      type: Number,
    },
    coordinators: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    winners: [String],
    images: [String],
    imageCover: {
      type: String,
    },
    winnersimages: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* eventSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
}); */

// Define a pre-save hook to convert the timing string to a Date object
eventSchema.pre("save", function (next) {
  // Check if the timing field is present and is a string
  if (this.timing && typeof this.timing === "string") {
    // Parse the timing string into a Date object
    this.timing = new Date(this.timing);
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
