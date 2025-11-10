const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.execute("SELECT id FROM users WHERE email=?", [email]);
    if (rows.length) return res.status(400).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute("INSERT INTO users (email, passwordHash) VALUES (?,?)", [email, hash]);
    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: result.insertId, email } });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.execute("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ error: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, email } });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
