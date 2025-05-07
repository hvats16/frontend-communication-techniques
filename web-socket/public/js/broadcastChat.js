document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');
  const connectionStatus = document.getElementById('connection-status');
  
  // Connect to broadcast WebSocket endpoint
  const socket = new WebSocket(`ws://${window.location.host}/broadcast`);
  
  socket.onopen = () => {
    connectionStatus.textContent = 'Connected';
    connectionStatus.style.color = 'green';
  };
  
  socket.onclose = () => {
    connectionStatus.textContent = 'Disconnected';
    connectionStatus.style.color = 'red';
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
    connectionStatus.textContent = 'Error: Could not connect to server';
    connectionStatus.style.color = 'red';
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'system') {
        addSystemMessage(data.message);
      } else if (data.type === 'message') {
        addMessage(data.message, 'received');
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      addMessage(event.data, 'received');
    }
  };
  
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    if (socket.readyState === WebSocket.OPEN) {
      const messageObj = {
        type: 'broadcast',
        message: message
      };
      
      socket.send(JSON.stringify(messageObj));
      addMessage(message, 'sent');
      messageInput.value = '';
    } else {
      alert('Cannot send message. WebSocket is not connected.');
    }
  }
  
  function addMessage(message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    messageContainer.appendChild(messageElement);
    chatMessages.appendChild(messageContainer);
    
    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function addSystemMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'status';
    messageContainer.textContent = message;
    chatMessages.appendChild(messageContainer);
    
    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}); 