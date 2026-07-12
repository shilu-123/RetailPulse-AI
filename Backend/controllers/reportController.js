const prisma = require("../config/db");

/* ===================================
   BUSINESS REPORT
=================================== */

exports.getReport = async (req, res) => {

    try {

        const totalProducts = await prisma.product.count();

        const totalCustomers = await prisma.customer.count();

        const totalCategories = await prisma.category.count();

        const lowStockProducts = await prisma.product.count({
            where: {
                stock: {
                    lte: 5
                }
            }
        });

        const inventory = await prisma.product.findMany({
            select: {
                price: true,
                stock: true
            }
        });

        const inventoryValue = inventory.reduce((total, item) => {
            return total + (item.price * item.stock);
        }, 0);

        res.status(200).json({

            success: true,

            report: {

                totalProducts,

                totalCustomers,

                totalCategories,

                lowStockProducts,

                inventoryValue

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};