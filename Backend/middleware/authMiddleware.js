const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check Authorization Header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token missing."
            });
        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find User
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
};

module.exports = protect;