const { app, server, wss } = require("./server/server");
const { setupBroadcastServer } = require("./server/broadcastServer");
const { setupPrivateServer } = require("./server/privateServer");
const url = require("url");

// Set up WebSocket server with path-based routing
wss.on("connection", (ws, req) => {
  const pathname = url.parse(req.url).pathname;
  
  if (pathname === "/broadcast") {
    // Handle as broadcast connection
    ws.isBroadcast = true;
  } else if (pathname === "/private") {
    // Handle as private connection
    ws.isPrivate = true;
  }
  
  // Remove the initial connection handler
  ws.removeAllListeners("message");
});

// Set up specialized handlers
setupBroadcastServer({
  clients: wss.clients,
  on: (event, callback) => {
    if (event === "connection") {
      wss.on("connection", (ws, req) => {
        if (ws.isBroadcast) {
          callback(ws, req);
        }
      });
    }
  }
});

setupPrivateServer({
  clients: wss.clients,
  on: (event, callback) => {
    if (event === "connection") {
      wss.on("connection", (ws, req) => {
        if (ws.isPrivate) {
          callback(ws, req);
        }
      });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Broadcast WebSocket server is running on ws://localhost:${PORT}/broadcast`);
  console.log(`Private WebSocket server is running on ws://localhost:${PORT}/private`);
});
