import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'campus-sync-manager',
    connectionLimit: 100
});

// Endpoint to get all tables data
app.get('/allData', async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();

        // Query to retrieve all students with their associated classes and teachers
        const [studentsRows] = await connection.query(`
            SELECT s.*, c.ClassName AS StudentClassName, t.FirstName AS TeacherFirstName, t.LastName AS TeacherLastName
            FROM students s
            LEFT JOIN student_classes sc ON s.StudentID = sc.StudentID
            LEFT JOIN classes c ON sc.ClassID = c.ClassID
            LEFT JOIN teacher_classes tc ON c.ClassID = tc.ClassID
            LEFT JOIN teachers t ON tc.TeacherID = t.TeacherID
        `);

        // Query to retrieve all teachers with their associated classes
        const [teachersRows] = await connection.query(`
            SELECT t.*, c.ClassName
            FROM teachers t
            LEFT JOIN teacher_classes tc ON t.TeacherID = tc.TeacherID
            LEFT JOIN classes c ON tc.ClassID = c.ClassID
        `);

        // Query to retrieve all classes with their associated teachers
        const [classesRows] = await connection.query(`
            SELECT c.*, t.FirstName AS TeacherFirstName, t.LastName AS TeacherLastName
            FROM classes c
            LEFT JOIN teacher_classes tc ON c.ClassID = tc.ClassID
            LEFT JOIN teachers t ON tc.TeacherID = t.TeacherID
        `);

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
app.get('/students', async (req: Request, res: Response) => {
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
app.get('/teachers', async (req: Request, res: Response) => {
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
app.get('/classes', async (req: Request, res: Response) => {
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



// // Endpoint to get all students with their associated classes and teachers
// app.get('/students', async (req: Request, res: Response) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query(`
//             SELECT s.*, c.ClassName, t.FirstName AS TeacherFirstName, t.LastName AS TeacherLastName
//             FROM students s
//             LEFT JOIN student_classes sc ON s.StudentID = sc.StudentID
//             LEFT JOIN classes c ON sc.ClassID = c.ClassID
//             LEFT JOIN teacher_classes tc ON c.ClassID = tc.ClassID
//             LEFT JOIN teachers t ON tc.TeacherID = t.TeacherID
//         `);
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to get all teachers with their associated classes
// app.get('/teachers', async (req: Request, res: Response) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query(`
//             SELECT t.*, c.ClassName
//             FROM teachers t
//             LEFT JOIN teacher_classes tc ON t.TeacherID = tc.TeacherID
//             LEFT JOIN classes c ON tc.ClassID = c.ClassID
//         `);
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to get all classes with their associated teachers
// app.get('/classes', async (req: Request, res: Response) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query(`
//             SELECT c.*, t.FirstName AS TeacherFirstName, t.LastName AS TeacherLastName
//             FROM classes c
//             LEFT JOIN teacher_classes tc ON c.ClassID = tc.ClassID
//             LEFT JOIN teachers t ON tc.TeacherID = t.TeacherID
//         `);
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
