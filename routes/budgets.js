const express = require("express");
const pool = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { monthStrFromDate } = require("../helpers/budgets");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { category, amount } = req.body;
  const month = monthStrFromDate(new Date());
  await pool.execute(
    `INSERT INTO budgets (userId, category, amount, month)
     VALUES (?,?,?,?)
     ON DUPLICATE KEY UPDATE amount=VALUES(amount)`,
    [req.user.id, category, amount, month]
  );
  res.json({ success: true });
});

router.get("/", authMiddleware, async (req, res) => {
  const month = monthStrFromDate(new Date());
  const [rows] = await pool.execute("SELECT * FROM budgets WHERE userId=? AND month=?", [req.user.id, month]);
  res.json(rows);
});

module.exports = router;
