const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Agendamento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE,
      hora TIME,
      paciente TEXT,
      doutor TEXT,
      status TEXT
    )
  `);
});

module.exports = db;