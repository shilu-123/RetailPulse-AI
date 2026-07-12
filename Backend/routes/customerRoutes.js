const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

router.use(protect);

// Create Customer
router.post("/", createCustomer);

// Get All Customers
router.get("/", getCustomers);

// Get Customer By ID
router.get("/:id", getCustomerById);

// Update Customer
router.put("/:id", updateCustomer);

// Delete Customer
router.delete("/:id", deleteCustomer);

module.exports = router;