import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    message: '',
    level: 'info'
  });
  const [loading, setLoading] = useState(false);

  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Submit new log
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLog.message.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5050/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLog),
      });

      if (response.ok) {
        const createdLog = await response.json();
        setLogs(prev => [createdLog, ...prev]);
        setNewLog({ message: '', level: 'info' });
      } else {
        alert('Failed to create log');
      }
    } catch (error) {
      console.error('Error creating log:', error);
      alert('Error creating log');
    } finally {
      setLoading(false);
    }
  };

  // Load logs on component mount
  useEffect(() => {
    fetchLogs();
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return '#ff4444';
      case 'warn': return '#ffaa00';
      case 'info': return '#4444ff';
      case 'debug': return '#44aa44';
      default: return '#666666';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Log Ingestion System</h1>
      </header>
      
      <main className="App-main">
        {/* Log Submission Form */}
        <section className="log-form">
          <h2>Submit New Log</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={newLog.message}
                onChange={(e) => setNewLog(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter log message..."
                required
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="level">Level:</label>
              <select
                id="level"
                value={newLog.level}
                onChange={(e) => setNewLog(prev => ({ ...prev, level: e.target.value }))}
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Log'}
            </button>
          </form>
        </section>

        {/* Logs Display */}
        <section className="logs-display">
          <h2>Recent Logs ({logs.length})</h2>
          <button onClick={fetchLogs} className="refresh-btn">Refresh Logs</button>
          
          <div className="logs-list">
            {logs.length === 0 ? (
              <p className="no-logs">No logs found. Submit a log to get started!</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="log-item" style={{ borderLeftColor: getLevelColor(log.level) }}>
                  <div className="log-header">
                    <span className="log-level" style={{ color: getLevelColor(log.level) }}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="log-timestamp">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="log-message">{log.message}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;