const express = require("express");
const pool = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { monthStrFromDate } = require("../helpers/budgets");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { walletId, type, amount, category, date, description } = req.body;
  const [wallet] = await pool.execute("SELECT * FROM wallets WHERE id=? AND userId=?", [walletId, req.user.id]);
  if (!wallet.length) return res.status(404).json({ error: "Wallet not found" });

  await pool.execute(
    "INSERT INTO transactions (walletId, type, amount, category, date, description) VALUES (?,?,?,?,?,?)",
    [walletId, type, amount, category, date, description]
  );

  const delta = type === "income" ? amount : -amount;
  await pool.execute("UPDATE wallets SET balance = balance + ? WHERE id=?", [delta, walletId]);

  res.json({ success: true });
});

router.get("/", authMiddleware, async (req, res) => {
  const { walletId, startDate, endDate } = req.query;
  let query = `
    SELECT t.* FROM transactions t 
    JOIN wallets w ON t.walletId=w.id 
    WHERE w.userId=?`;
  const params = [req.user.id];
  if (walletId) { query += " AND t.walletId=?"; params.push(walletId); }
  if (startDate) { query += " AND t.date>=?"; params.push(startDate); }
  if (endDate) { query += " AND t.date<=?"; params.push(endDate); }
  const [rows] = await pool.execute(query, params);
  res.json(rows);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.execute(`
    SELECT t.*, w.userId FROM transactions t 
    JOIN wallets w ON t.walletId=w.id 
    WHERE t.id=?`, [id]);
  if (!rows.length || rows[0].userId !== req.user.id)
    return res.status(403).json({ error: "Unauthorized" });

  const t = rows[0];
  const delta = t.type === "income" ? -t.amount : t.amount;
  await pool.execute("DELETE FROM transactions WHERE id=?", [id]);
  await pool.execute("UPDATE wallets SET balance = balance + ? WHERE id=?", [delta, t.walletId]);
  res.json({ success: true });
});

module.exports = router;
