const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./middleware/logger.js");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./db");
const bodyParser = require('body-parser');

// router routes import
const userRoutes = require("./routes/user");
const lessonRoute = require("./routes/lesson-route.js");
const categoryRoute = require("./routes/category-route.js");
const myLessonRoute = require("./routes/myLesson-route.js");
const invoiceRoute = require("./routes/invoice-route.js");
const coursRoute = require("./routes/course-route.js");
const qpayRoute = require("./routes/qpayRentRoute.js")
const errorHandler = require("./middleware/error.js");
connectDB();

const app = express();
app.use(cors());
app.use(logger);
app.use(express.json()); // Using built-in express.json() for JSON parsing
app.use(express.urlencoded({ extended: true })); // Using built-in express.urlencoded() for URL-encoded data parsing

// api handlers
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/lesson", lessonRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/myLesson", myLessonRoute);
app.use("/api/v1/invoice", invoiceRoute);
app.use("/api/v1/course", coursRoute);
app.use("/api/v1/qpayRent", qpayRoute)


// file upload limit
app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ limit: '300mb', extended: true }));
app.use("/uploads", express.static(__dirname + "/public/uploads")); // Serve uploaded files

// global error handler
app.use(errorHandler);

// start Express server
const server = app.listen(
  process.env.PORT,
  console.log(`Express server is running on port ${process.env.PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
