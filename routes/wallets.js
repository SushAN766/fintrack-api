const express = require("express");
const pool = require("../db");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name, initialBalance = 0 } = req.body;
  const [result] = await pool.execute(
    "INSERT INTO wallets (name, userId, balance) VALUES (?, ?, ?)",
    [name, req.user.id, initialBalance]
  );
  res.json({ id: result.insertId, name, balance: initialBalance });
});

router.get("/", authMiddleware, async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM wallets WHERE userId=?", [req.user.id]);
  res.json(rows);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.execute("DELETE FROM wallets WHERE id=? AND userId=?", [id, req.user.id]);
  res.json({ success: true });
});

module.exports = router;
