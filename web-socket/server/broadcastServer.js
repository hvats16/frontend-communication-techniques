const WebSocket = require("ws");

/**
 * Sets up broadcast chat WebSocket server functionality
 * @param {WebSocket.Server} wss - WebSocket server instance
 */
function setupBroadcastServer(wss) {
  // Handle connections
  wss.on("connection", (ws, req) => {
    console.log("Broadcast chat client connected");
    
    // Send welcome message to new client
    ws.send(JSON.stringify({
      type: "system",
      message: "Welcome to the broadcast chat!"
    }));
    
    // Handle incoming messages
    ws.on("message", (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        console.log("Broadcast received:", parsedMessage);
        
        // Broadcast to all connected clients
        if (parsedMessage.type === "broadcast") {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "message",
                message: parsedMessage.message
              }));
            }
          });
        }
      } catch (error) {
        console.error("Error processing broadcast message:", error);
      }
    });
    
    // Handle client disconnection
    ws.on("close", () => {
      console.log("Broadcast chat client disconnected");
    });
  });
}

module.exports = { setupBroadcastServer }; 