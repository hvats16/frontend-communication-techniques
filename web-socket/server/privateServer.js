const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

// Store connected clients with their IDs
const clients = new Map();

/**
 * Sets up private chat WebSocket server functionality
 * @param {WebSocket.Server} wss - WebSocket server instance
 */
function setupPrivateServer(wss) {
  // Handle connections
  wss.on("connection", (ws, req) => {
    const userId = uuidv4();
    clients.set(userId, ws);
    console.log(`Private chat client connected with ID: ${userId}`);
    
    // Send the user their own ID
    ws.send(JSON.stringify({
      type: "connection",
      userId: userId,
      message: "Welcome to the private chat!"
    }));
    
    // Send list of online users (excluding self)
    const onlineUsers = Array.from(clients.keys()).filter(id => id !== userId);
    ws.send(JSON.stringify({
      type: "userList",
      users: onlineUsers
    }));
    
    // Notify other users about new connection
    broadcastUserList();
    
    // Handle incoming messages
    ws.on("message", (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        console.log("Private chat received:", parsedMessage);
        
        if (parsedMessage.type === "private" && parsedMessage.recipient) {
          // Send private message to specific recipient
          const recipientWs = clients.get(parsedMessage.recipient);
          if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
            recipientWs.send(JSON.stringify({
              type: "message",
              sender: userId,
              message: parsedMessage.message
            }));
          }
        }
      } catch (error) {
        console.error("Error processing private message:", error);
      }
    });
    
    // Handle client disconnection
    ws.on("close", () => {
      console.log(`Private chat client ${userId} disconnected`);
      clients.delete(userId);
      broadcastUserList();
    });
    
    // Handle errors
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });
  
  // Function to broadcast updated user list to all clients
  function broadcastUserList() {
    const userList = Array.from(clients.keys());
    clients.forEach((clientWs, clientId) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({
          type: "userList",
          users: userList.filter(id => id !== clientId)
        }));
      }
    });
  }
}

module.exports = { setupPrivateServer }; 