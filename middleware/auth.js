import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Import bcryptjs instead of bcrypt

// JWT Secret
const JWT_SECRET = 'your_jwt_secret'; // You should store this in an environment variable

// Authentication middleware
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Function to hash password
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw error;
    }
};

// Function to compare passwords
export const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw error;
    }
};
