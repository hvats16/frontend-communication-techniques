const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Configure static file serving
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/broadcast", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/broadcastChat.html"));
});

app.get("/private", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/privateChat.html"));
});

// Redirect root to private chat by default
app.get("/", (req, res) => {
  res.redirect("/private");
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Export for use in different server types
module.exports = { app, server, wss }; 