const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* ===========================
   GET ALL CATEGORIES
=========================== */

exports.getCategories = async (req, res) => {

    try {

        const categories = await prisma.category.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

/* ===========================
   CREATE CATEGORY
=========================== */

exports.createCategory = async (req, res) => {

    try {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        const exists = await prisma.category.findUnique({
            where: { name }
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = await prisma.category.create({
            data: {
                name
            }
        });

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            category
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};