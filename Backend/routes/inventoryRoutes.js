const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getInventory,
    getLowStockProducts,
    updateStock
} = require("../controllers/inventoryController");

router.use(protect);

/* ===================================
   INVENTORY ROUTES
=================================== */

// Get All Inventory
router.get("/", getInventory);

// Get Low Stock Products
router.get("/low-stock", getLowStockProducts);

// Update Stock
router.put("/:id", updateStock);

module.exports = router;