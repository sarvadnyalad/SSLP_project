const db = require("../db");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const userId = parseInt(token); // Simulating token as user ID for simplicity
    db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, user) => {
      if (err || !user) return res.status(401).json({ error: "Unauthorized" });
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
