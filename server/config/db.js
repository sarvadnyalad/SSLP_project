const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or connect to SQLite database
const dbPath = path.resolve(__dirname, "slpp.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;

db.serialize(() => {
  // Create Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      dob TEXT NOT NULL,
      password TEXT NOT NULL,
      bioID TEXT UNIQUE NOT NULL
    );
  `);

  // Create Petitions Table
  db.run(`
    CREATE TABLE IF NOT EXISTS petitions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      petitionerId INTEGER NOT NULL,
      status TEXT DEFAULT 'open',
      signatures TEXT DEFAULT '[]',
      response TEXT DEFAULT '',
      FOREIGN KEY (petitionerId) REFERENCES users (id)
    );
  `);

  console.log("Tables ensured in SQLite database.");
});
