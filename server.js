const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Path to logs.json
const logsFilePath = path.join(__dirname, 'logs.json');

// Helper function to read logs
const readLogs = () => {
  try {
    const data = fs.readFileSync(logsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write logs
const writeLogs = (logs) => {
  fs.writeFileSync(logsFilePath, JSON.stringify(logs, null, 2));
};

// Routes
app.get('/api/logs', (req, res) => {
  try {
    const logs = readLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

app.post('/api/logs', (req, res) => {
  try {
    const { message, level = 'info', timestamp = new Date().toISOString() } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newLog = {
      id: uuidv4(),
      message,
      level,
      timestamp,
      createdAt: new Date().toISOString()
    };

    const logs = readLogs();
    logs.push(newLog);
    writeLogs(logs);

    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Log ingestion server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Logs endpoint: http://localhost:${PORT}/api/logs`);
});
