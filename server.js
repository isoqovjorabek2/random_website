const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, process.env.DATA_DIR || '.', 'visitors.json');

app.set('trust proxy', 1);

// Middleware to log visitor IP (must run before static so all requests get logged)
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const timestamp = new Date().toISOString();
  const entry = { ip, timestamp, path: req.path };

  let logs = [];
  try {
    if (fs.existsSync(LOG_FILE)) {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
    }
  } catch (e) {
    logs = [];
  }

  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  next();
});

// Serve static files from public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optional: API to view collected IPs (for educational review - add auth in production!)
app.get('/admin/logs', (req, res) => {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
      res.json(logs);
    } else {
      res.json([]);
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

app.listen(PORT, () => {
  console.log(`Prank site running at http://localhost:${PORT}`);
  console.log(`Visitor logs saved to ${LOG_FILE}`);
});
