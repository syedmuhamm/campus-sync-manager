import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // Import jwt library
import { authenticateToken } from '../../middleware/auth.js';
import bcrypt from 'bcrypt';

const JWT_SECRET = 'your_jwt_secret'; // should store this in an environment variable

const app = express();
app.use(cors());
app.use(express.json()); 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'campus-sync-manager',
    connectionLimit: 100
});

// Admin login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM admins WHERE email = ?', [email]);
        connection.release();

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const admin = rows[0];
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin register endpoint
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const connection = await pool.getConnection();
        // Check if the email is already registered
        const [existingUser] = await connection.query('SELECT * FROM admins WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        // Insert the new user into the database with hashed password
        await connection.query('INSERT INTO admins (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, hashedPassword]);
        connection.release();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error registering admin user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Protect the existing routes
// app.use('/allData', authenticateToken);
// app.use('/students', authenticateToken);
// app.use('/teachers', authenticateToken);
// app.use('/classes', authenticateToken);

// Endpoint to get all data (students, teachers, classes)
app.get('/allData', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Query to retrieve all student data
        const [studentsRows] = await connection.query('SELECT * FROM students');

        // Query to retrieve all teacher data
        const [teachersRows] = await connection.query('SELECT * FROM teachers');

        // Query to retrieve all class data
        const [classesRows] = await connection.query('SELECT * FROM classes');

        connection.release();

        // Constructing the API response object
        const responseData = {
            students: studentsRows,
            teachers: teachersRows,
            classes: classesRows
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all students
app.get('/students', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM students');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all teachers
app.get('/teachers', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM teachers');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all classes
app.get('/classes', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM classes');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
