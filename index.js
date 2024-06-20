const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const userRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");
const appRoute = require("./Routes/applications");
const authenticateToken = require("./middleware/authMiddleware");

app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log(err);
    });

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

// Routes
app.use("/api/users", authenticateToken, userRoute);
app.use("/api/auth", authRoute);
app.use("/api/applications", authenticateToken, appRoute);

// Start the server
app.listen(8000, () => {
    console.log("Backend server running!!!");
});
