const prisma = require("../config/db");

/* ===================================
   DASHBOARD STATS
=================================== */

exports.getDashboardStats = async (req, res) => {

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

        res.status(200).json({

            success: true,

            data: {
                totalProducts,
                totalCustomers,
                totalCategories,
                lowStockProducts
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