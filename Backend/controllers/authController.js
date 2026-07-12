const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const generateToken = require("../utils/generateToken");

const prisma = new PrismaClient();

/* ======================================================
   REGISTER USER
====================================================== */

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const { password: _, ...userData } = user;

        const token = generateToken(user);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: userData
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

/* ======================================================
   LOGIN USER
====================================================== */

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user);

        const { password: _, ...userData } = user;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: userData
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

/* ======================================================
   GET USER PROFILE
====================================================== */

exports.getProfile = async (req, res) => {

    try {

        const { password, ...user } = req.user;

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};