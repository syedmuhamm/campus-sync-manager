// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('./db'); // Assume pool is set up to connect to MySQL

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find admin by username
    const [admin] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (!admin.length) return res.status(400).json({ message: 'Username or password is incorrect' });

    // Validate password
    const validPass = await bcrypt.compare(password, admin[0].password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    // Create and assign a token
    const token = jwt.sign({ id: admin[0].id }, process.env.TOKEN_SECRET);
    res.header('Authorization', `Bearer ${token}`).json({ token });
});

module.exports = router;
