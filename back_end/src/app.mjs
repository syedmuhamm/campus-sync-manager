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
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query('SELECT * FROM admins WHERE AdminEmail = ?', [email]);
//         connection.release();

//         if (rows.length === 0) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         const admin = rows[0];
//         const isPasswordValid = await bcrypt.compare(password, admin.AdminPassword);

//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         const token = jwt.sign({ id: admin.AdminID, email: admin.AdminEmail }, JWT_SECRET, { expiresIn: '240h' });

//         res.json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Admin register endpoint
// app.post('/register', async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     try {
//         const connection = await pool.getConnection();
//         // Check if the email is already registered
//         const [existingUser] = await connection.query('SELECT * FROM admins WHERE AdminEmail = ?', [email]);
//         if (existingUser.length > 0) {
//             return res.status(400).json({ error: 'Email is already registered' });
//         }
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
//         // Insert the new user into the database with hashed password
//         await connection.query('INSERT INTO admins (FirstName, LastName, AdminEmail, AdminPassword) VALUES (?, ?, ?, ?)', [firstName, lastName, email, hashedPassword]);
//         connection.release();
//         res.status(201).json({ message: 'Admin registered successfully' });
//     } catch (error) {
//         console.error('Error registering admin user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to update admin information
// app.put('/updateAdmin/:id', authenticateToken, async (req, res) => {
//     const { id } = req.params;
//     const {
//         FirstName, LastName, AdminEmail, AdminCNIC, AdminPhoneNumber,
//         AdminAddress, AdminStatus, AdminCreatedAt
//     } = req.body;
    
//     try {
//         const connection = await pool.getConnection();

//         // Check if a new password is provided and hash it
//         // let hashedPassword;
//         // if (password) {
//         //     hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
//         // }

//         // Construct the SQL query based on provided fields
//         const fields = [];
//         const values = [];

//         if (FirstName) {
//             fields.push('FirstName = ?');
//             values.push(FirstName);
//         }
//         if (LastName) {
//             fields.push('LastName = ?');
//             values.push(LastName);
//         }
//         if (AdminEmail) {
//             fields.push('AdminEmail = ?');
//             values.push(AdminEmail);
//         }
//         if (AdminCNIC) {
//             fields.push('AdminCNIC = ?');
//             values.push(AdminCNIC);
//         }
//         if (AdminPhoneNumber) {
//             fields.push('AdminPhoneNumber = ?');
//             values.push(AdminPhoneNumber);
//         }
//         if (AdminAddress) {
//             fields.push('AdminAddress = ?');
//             values.push(AdminAddress);
//         }
//         if (AdminStatus) {
//             fields.push('AdminStatus = ?');
//             values.push(AdminStatus);
//         }
//         if (AdminCreatedAt) {
//             fields.push('AdminCreatedAt = ?');
//             values.push(AdminCreatedAt);
//         }
//         values.push(id);

//         const sql = `UPDATE admins SET ${fields.join(', ')} WHERE AdminID = ?`;
        
//         await connection.query(sql, values);

//         // Fetch the updated admin data
//         const [updatedAdmin] = await connection.query('SELECT AdminID, FirstName, LastName, AdminEmail, AdminCNIC, AdminPhoneNumber, AdminAddress, AdminStatus, AdminCreatedAt FROM admins WHERE AdminID = ?', [id]);
//         connection.release();

//         res.json(updatedAdmin[0]);
//     } catch (error) {
//         console.error('Error updating admin:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



// Protect the existing routes
// app.use('/allData', authenticateToken);
// app.use('/students', authenticateToken);
// app.use('/teachers', authenticateToken);
// app.use('/classes', authenticateToken);

// Endpoint to get all data (students, teachers, classes)
// app.get('/allData', async (req, res) => {
//     try {
//         const connection = await pool.getConnection();

//         // Query to retrieve all student data
//         const [studentsRows] = await connection.query('SELECT * FROM students');

//         // Query to retrieve all teacher data
//         // const [teachersRows] = await connection.query('SELECT * FROM teachers');

//         // Query to retrieve all class data
//         const [classesRows] = await connection.query('SELECT * FROM classes');

//         // Query to retrieve all class sections
//         const[classSectionsRows] = await connection.query('SELECT * FROM class_sections')

//          // Query to retrieve all admin data (excluding passwords)
//          const [adminsRows] = await connection.query('SELECT AdminID, FirstName, LastName, AdminEmail, AdminCNIC, AdminPhoneNumber, AdminAddress, AdminStatus, AdminCreatedAt FROM admins');

//          connection.release();

//         // Constructing the API response object
//         const responseData = {
//             students: studentsRows,
//             // teachers: teachersRows,
//             classes: classesRows,
//             classSections: classSectionsRows,
//             admins: adminsRows
//         };

//         res.json(responseData);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to get all students
// app.get('/students', async (req, res) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query('SELECT * FROM students');
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Update student endpoint, including additional fields
// app.put('/updateStudent/:id', async (req, res) => {
//     const { id } = req.params;
//     const { 
//         FirstName, 
//         LastName, 
//         DateOfBirth, 
//         Gender, 
//         FeeAmount, 
//         FeePaid, 
//         ClassID,
//         ClassSectionID,
//         StudentEmail,
//         StudentPhoneNumber, 
//         StudentFatherName, 
//         StudentGuardianPhoneNumber, 
//         Status,
//         StudentAddress
//     } = req.body;

//     try {
//         const connection = await pool.getConnection();
//         await connection.query(
//             'UPDATE students SET FirstName = ?, LastName = ?, DateOfBirth = ?, Gender = ?, FeeAmount = ?, FeePaid = ?, ClassID = ?, ClassSectionID = ?, StudentEmail = ?, StudentPhoneNumber = ?, StudentFatherName = ?, StudentGuardianPhoneNumber = ?, Status = ?, StudentAddress = ? WHERE StudentID = ?',
//             [FirstName, LastName, DateOfBirth, Gender, FeeAmount, FeePaid, ClassID, ClassSectionID, StudentEmail, StudentPhoneNumber, StudentFatherName, StudentGuardianPhoneNumber, Status, StudentAddress, id]
//         );

//         // Fetch the updated student data
//         const [updatedStudent] = await connection.query('SELECT * FROM students WHERE StudentID = ?', [id]);
//         connection.release();

//         res.json(updatedStudent[0]);
//     } catch (error) {
//         console.error('Error updating student:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



// // Endpoint to get all teachers
// // app.get('/teachers', async (req, res) => {
// //     try {
// //         const connection = await pool.getConnection();
// //         const [rows] = await connection.query('SELECT * FROM teachers');
// //         connection.release();
// //         res.json(rows);
// //     } catch (error) {
// //         console.error('Error executing query:', error);
// //         res.status(500).json({ error: 'Internal server error' });
// //     }
// // });

// // Endpoint to get all classes
// app.get('/classes', async (req, res) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query('SELECT * FROM classes');
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to get the current logged-in admin user
// app.get('/currentAdmin', authenticateToken, async (req, res) => {
//     try {
//         const adminId = req.admin.id;
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query('SELECT AdminID, FirstName, LastName, AdminEmail, AdminCNIC, AdminPhoneNumber, AdminAddress, AdminStatus FROM admins WHERE AdminID = ?', [adminId]);
//         connection.release();

//         if (rows.length === 0) {
//             return res.status(404).json({ error: 'Admin not found' });
//         }

//         res.json(rows[0]);
//     } catch (error) {
//         console.error('Error fetching admin:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
