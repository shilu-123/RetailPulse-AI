const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getReport
} = require("../controllers/reportController");

router.use(protect);

router.get("/", getReport);

module.exports = router;