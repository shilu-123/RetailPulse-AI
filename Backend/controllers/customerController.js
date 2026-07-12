const prisma = require("../config/db");

/* ===================================
   CREATE CUSTOMER
=================================== */

exports.createCustomer = async (req, res) => {

    try {

        const { name, email, phone } = req.body;

        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Check duplicate email
        const existingCustomer = await prisma.customer.findUnique({
            where: {
                email
            }
        });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Customer already exists"
            });
        }

        // Create customer
        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                phone
            }
        });

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer
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
   GET ALL CUSTOMERS
=================================== */

exports.getCustomers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const where = {};

        if (search) {

            where.OR = [

                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },

                {
                    email: {
                        contains: search,
                        mode: "insensitive"
                    }
                },

                {
                    phone: {
                        contains: search,
                        mode: "insensitive"
                    }
                }

            ];

        }

        const totalCustomers = await prisma.customer.count({
            where
        });

        const customers = await prisma.customer.findMany({

            where,

            skip,

            take: limit,

            orderBy: {
                id: "desc"
            }

        });

        res.status(200).json({

            success: true,

            totalCustomers,

            currentPage: page,

            totalPages: Math.ceil(totalCustomers / limit),

            customers

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
   GET CUSTOMER BY ID
=================================== */

exports.getCustomerById = async (req, res) => {

    try {

        const { id } = req.params;

        const customer = await prisma.customer.findUnique({

            where: {
                id: Number(id)
            }

        });

        if (!customer) {

            return res.status(404).json({

                success: false,
                message: "Customer not found"

            });

        }

        res.status(200).json({

            success: true,
            customer

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
   UPDATE CUSTOMER
=================================== */

exports.updateCustomer = async (req, res) => {

    try {

        const { id } = req.params;

        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        const { name, email, phone } = req.body;

        // Check duplicate email
        if (email) {

            const existingCustomer = await prisma.customer.findFirst({
                where: {
                    email,
                    NOT: {
                        id: Number(id)
                    }
                }
            });

            if (existingCustomer) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }

        }

        const data = {};

        if (name) data.name = name;
        if (email) data.email = email;
        if (phone) data.phone = phone;

        const updatedCustomer = await prisma.customer.update({

            where: {
                id: Number(id)
            },

            data

        });

        res.status(200).json({

            success: true,
            message: "Customer updated successfully",
            customer: updatedCustomer

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
   DELETE CUSTOMER
=================================== */

exports.deleteCustomer = async (req, res) => {

    try {

        const { id } = req.params;

        const customer = await prisma.customer.findUnique({

            where: {
                id: Number(id)
            }

        });

        if (!customer) {

            return res.status(404).json({

                success: false,
                message: "Customer not found"

            });

        }

        await prisma.customer.delete({

            where: {
                id: Number(id)
            }

        });

        res.status(200).json({

            success: true,
            message: "Customer deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};