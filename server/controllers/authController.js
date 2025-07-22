const db = require("../config/db");


exports.registerUser = (req, res) => {
  const { email, fullName, dob, password, bioID } = req.body;

  const query = `INSERT INTO users (email, fullName, dob, password, bioID) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [email, fullName, dob, password, bioID], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: "User registered successfully", id: this.lastID });
  });
};


exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  });
};

