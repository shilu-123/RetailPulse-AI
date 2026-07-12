const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getProfile
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", protect, getProfile);

router.get("/admin", protect, adminOnly, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin"
    });
});

module.exports = router;