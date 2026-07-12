const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "RetailPulse AI",
        message: "Backend is running successfully 🚀"
    });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));//

module.exports = app;