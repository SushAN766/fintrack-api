const express = require("express");
const pool = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { monthStrFromDate } = require("../helpers/budgets");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const month = monthStrFromDate(new Date());
  const [rows] = await pool.execute(
    `SELECT type, SUM(amount) AS total
     FROM transactions t 
     JOIN wallets w ON t.walletId=w.id 
     WHERE w.userId=? AND DATE_FORMAT(date,'%Y-%m')=? 
     GROUP BY type`,
    [req.user.id, month]
  );
  let income = 0, expense = 0;
  for (const r of rows) {
    if (r.type === "income") income = r.total;
    else expense = r.total;
  }
  res.json({ month, income, expense, savings: income - expense });
});

module.exports = router;
