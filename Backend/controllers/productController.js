const prisma = require("../config/db");

/* ===================================
   CREATE PRODUCT
=================================== */

exports.createProduct = async (req, res) => {

    try {

        const {
            name,
            sku,
            price,
            stock,
            categoryId
        } = req.body;

        // Validation
        if (!name || !sku || !price || !stock || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        if (Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0"
            });
        }

        if (Number(stock) < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative"
            });
        }

        // Check duplicate SKU
        const existingProduct = await prisma.product.findUnique({
            where: {
                sku
            }
        });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists"
            });
        }

        // Check Category
        const category = await prisma.category.findUnique({
            where: {
                id: Number(categoryId)
            }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Create Product
        const product = await prisma.product.create({

            data: {
                name,
                sku,
                price: Number(price),
                stock: Number(stock),
                categoryId: Number(categoryId)
            }

        });

        res.status(201).json({

            success: true,
            message: "Product created successfully",
            product

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
   GET PRODUCTS
   SEARCH + FILTER + PAGINATION
=================================== */

exports.getProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || "";
        const category = req.query.category;

        const skip = (page - 1) * limit;

        const where = {};

        // Search
        if (search) {

            where.OR = [

                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },

                {
                    sku: {
                        contains: search,
                        mode: "insensitive"
                    }
                }

            ];

        }

        // Category Filter
        if (category) {

            where.categoryId = Number(category);

        }

        const totalProducts = await prisma.product.count({

            where

        });

        const products = await prisma.product.findMany({

            where,

            include: {
                category: true
            },

            skip,

            take: limit,

            orderBy: {
                id: "desc"
            }

        });

        res.status(200).json({

            success: true,

            totalProducts,

            currentPage: page,

            totalPages: Math.ceil(totalProducts / limit),

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
   GET PRODUCT BY ID
=================================== */

exports.getProductById = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await prisma.product.findUnique({

            where: {
                id: Number(id)
            },

            include: {
                category: true
            }

        });

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({

            success: true,
            product

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
   UPDATE PRODUCT
=================================== */

exports.updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

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

        const {
            name,
            sku,
            price,
            stock,
            categoryId
        } = req.body;

        // Validate Price
        if (price !== undefined && Number(price) <= 0) {

            return res.status(400).json({

                success: false,
                message: "Price must be greater than 0"

            });

        }

        // Validate Stock
        if (stock !== undefined && Number(stock) < 0) {

            return res.status(400).json({

                success: false,
                message: "Stock cannot be negative"

            });

        }

        // Validate Category
        if (categoryId) {

            const category = await prisma.category.findUnique({

                where: {
                    id: Number(categoryId)
                }

            });

            if (!category) {

                return res.status(404).json({

                    success: false,
                    message: "Category not found"

                });

            }

        }

        // Check Duplicate SKU
        if (sku) {

            const existingSku = await prisma.product.findFirst({

                where: {

                    sku,

                    NOT: {
                        id: Number(id)
                    }

                }

            });

            if (existingSku) {

                return res.status(400).json({

                    success: false,
                    message: "SKU already exists"

                });

            }

        }

        // Partial Update
        const data = {};

        if (name) data.name = name;
        if (sku) data.sku = sku;
        if (price !== undefined) data.price = Number(price);
        if (stock !== undefined) data.stock = Number(stock);
        if (categoryId) data.categoryId = Number(categoryId);

        const updatedProduct = await prisma.product.update({

            where: {
                id: Number(id)
            },

            data

        });

        res.status(200).json({

            success: true,
            message: "Product updated successfully",
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


/* ===================================
   DELETE PRODUCT
=================================== */

exports.deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

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

        await prisma.product.delete({

            where: {
                id: Number(id)
            }

        });

        res.status(200).json({

            success: true,
            message: "Product deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};