# Log Ingestion System

A full-stack web application for ingesting, storing, and displaying log entries with a modern React frontend and Node.js backend.

## 🚀 Features

- **Log Submission**: Submit logs with different severity levels (debug, info, warn, error)
- **Real-time Display**: View all submitted logs with timestamps
- **Color-coded Log Levels**: Visual distinction between different log types
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Clean API endpoints for log management
- **Local Storage**: Logs are stored in a JSON file

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

### Frontend
- **React.js** - User interface library
- **CSS Grid** - Modern layout system
- **Fetch API** - HTTP requests

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

To check if you have them installed, run:
```bash
node --version
npm --version
```

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd log-ingestion-system

# Or download and extract the project folder
cd log-ingestion-system
```

### 2. Install Dependencies

Install backend dependencies:
```bash
npm install
```

Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

### 3. Start the Backend Server

In the root directory of the project:
```bash
node server.js
```

You should see:
```
Server is running on port 5050
Health check: http://localhost:5050/api/health
Logs endpoint: http://localhost:5050/api/logs
```

### 4. Start the Frontend Application

Open a new terminal window/tab and navigate to the client directory:
```bash
cd client
npm start
```

The React app will automatically open in your browser at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is busy).

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000 (or 3001)
- **Backend API**: http://localhost:5050

### API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/logs` - Retrieve all logs
- `POST /api/logs` - Create a new log entry

## 📱 How to Use

### Submitting Logs

1. Open the application in your browser
2. In the left panel, enter your log message
3. Select the appropriate log level (debug, info, warn, error)
4. Click "Submit Log"

### Viewing Logs

- All submitted logs appear in the right panel
- Logs are displayed with timestamps and color-coded levels
- Use the "Refresh Logs" button to fetch the latest logs
- Logs are automatically sorted with newest first

### Log Levels

- **Debug** (Green): Detailed debugging information
- **Info** (Blue): General information messages
- **Warning** (Orange): Warning messages
- **Error** (Red): Error messages

## 🔧 Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

**For Backend (port 5050):**
- Check if another process is using port 5050
- You can change the port in `server.js` by modifying the PORT variable

**For Frontend (port 3000/3001):**
- React will automatically try the next available port
- Check the terminal output for the correct URL

### Backend Not Starting

If the backend server won't start:
1. Make sure you're in the root directory
2. Check if all dependencies are installed: `npm install`
3. Verify Node.js is installed: `node --version`

### Frontend Not Loading

If the React app won't start:
1. Make sure you're in the client directory
2. Check if all dependencies are installed: `npm install`
3. Clear the cache: `npm start -- --reset-cache`

### API Connection Issues

If the frontend can't connect to the backend:
1. Ensure both servers are running
2. Check that the backend is on port 5050
3. Verify the API URLs in `client/src/App.js`

## 📁 Project Structure

```
log-ingestion-system/
├── server.js              # Backend server
├── logs.json              # Log storage file
├── package.json           # Backend dependencies
├── README.md              # This file
└── client/                # Frontend React app
    ├── package.json       # Frontend dependencies
    ├── public/            # Static files
    └── src/               # React source code
        ├── App.js         # Main React component
        ├── App.css        # Styles
        └── index.js       # React entry point
```

## 🔒 Security Notes

- This is a development application
- Logs are stored in plain text
- No authentication is implemented
- CORS is enabled for local development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure both servers are running
4. Check the browser console for errors
5. Review the terminal output for error messages

---

**Happy Logging! 🎉** 