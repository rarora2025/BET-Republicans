const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./endorsements.db');

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS endorsements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all endorsements
app.get('/api/endorsements', (req, res) => {
  db.all('SELECT * FROM endorsements ORDER BY timestamp DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get endorsement count
app.get('/api/endorsements/count', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM endorsements', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ count: row.count });
  });
});

// Add new endorsement
app.post('/api/endorsements', (req, res) => {
  const { name, email, phone, address, message } = req.body;
  const id = uuidv4();
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const stmt = db.prepare(`
    INSERT INTO endorsements (id, name, email, phone, address, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run([id, name, email, phone || '', address || '', message || ''], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Get the newly created endorsement
    db.get('SELECT * FROM endorsements WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json(row);
    });
  });
  
  stmt.finalize();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database initialized: endorsements.db`);
});
