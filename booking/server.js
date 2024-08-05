const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION");

  process.exit(1);
});
dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then((con) => {
    console.log(`name of the database is ${con.connections[0].name}`);
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const portnumber = 8000;

const server = app.listen(portnumber, () => {
  console.log(`App is running on port ${portnumber}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION");
  server.close(() => {
    process.exit(1);
  });
});
