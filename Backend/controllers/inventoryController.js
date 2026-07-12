const prisma = require("../config/db");

/* ===================================
   GET INVENTORY
=================================== */

exports.getInventory = async (req, res) => {

    try {

        const inventory = await prisma.product.findMany({

            select: {

                id: true,

                name: true,

                sku: true,

                stock: true,

                price: true,

                category: {
                    select: {
                        name: true
                    }
                }

            },

            orderBy: {
                id: "desc"
            }

        });

        res.status(200).json({

            success: true,

            count: inventory.length,

            inventory

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};
/* ===================================
   LOW STOCK PRODUCTS
=================================== */

exports.getLowStockProducts = async (req, res) => {

    try {

        const products = await prisma.product.findMany({

            where: {
                stock: {
                    lte: 5
                }
            },

            select: {

                id: true,

                name: true,

                sku: true,

                stock: true,

                category: {
                    select: {
                        name: true
                    }
                }

            },

            orderBy: {
                stock: "asc"
            }

        });

        res.status(200).json({

            success: true,

            count: products.length,

            products

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
/* ===================================
   UPDATE PRODUCT STOCK
=================================== */

exports.updateStock = async (req, res) => {

    try {

        const { id } = req.params;
        const { stock } = req.body;

        if (stock === undefined) {
            return res.status(400).json({
                success: false,
                message: "Stock is required"
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const updatedProduct = await prisma.product.update({

            where: {
                id: Number(id)
            },

            data: {
                stock: Number(stock)
            }

        });

        res.status(200).json({

            success: true,
            message: "Stock updated successfully",
            product: updatedProduct

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};