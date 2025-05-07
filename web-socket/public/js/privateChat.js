document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');
  const connectionStatus = document.getElementById('connection-status');
  const userList = document.getElementById('user-list');
  const recipientInfo = document.getElementById('recipient-info');
  
  let userId = null;
  let selectedRecipient = null;
  
  // Connect to private WebSocket endpoint
  const socket = new WebSocket(`ws://${window.location.host}/private`);
  
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
      
      if (data.type === 'connection') {
        // Store the user's own ID
        userId = data.userId;
        addSystemMessage(data.message);
      } 
      else if (data.type === 'userList') {
        // Update the list of online users
        updateUserList(data.users);
      } 
      else if (data.type === 'message') {
        // Receive a private message
        addMessage(data.message, 'received', data.sender);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      addMessage(event.data, 'received');
    }
  };
  
  function updateUserList(users) {
    // Clear current list
    while (userList.children.length > 1) {
      userList.removeChild(userList.lastChild);
    }
    
    // Add users to the list
    users.forEach(user => {
      const userItem = document.createElement('div');
      userItem.className = 'user-item';
      userItem.textContent = `User: ${user.substring(0, 6)}...`;
      userItem.dataset.userId = user;
      
      userItem.addEventListener('click', () => {
        // Select user for private messaging
        document.querySelectorAll('.user-item').forEach(item => {
          item.classList.remove('selected');
        });
        
        userItem.classList.add('selected');
        selectedRecipient = user;
        recipientInfo.textContent = `Chatting with: ${user.substring(0, 6)}...`;
        addSystemMessage(`Now chatting privately with User: ${user.substring(0, 6)}...`);
      });
      
      userList.appendChild(userItem);
    });
    
    if (users.length === 0) {
      const noUsers = document.createElement('div');
      noUsers.className = 'user-item';
      noUsers.textContent = 'No users online';
      userList.appendChild(noUsers);
    }
  }
  
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    if (!selectedRecipient) {
      addSystemMessage('Please select a recipient first.');
      return;
    }
    
    if (socket.readyState === WebSocket.OPEN) {
      const messageObj = {
        type: 'private',
        recipient: selectedRecipient,
        message: message
      };
      
      socket.send(JSON.stringify(messageObj));
      addMessage(message, 'sent');
      messageInput.value = '';
    } else {
      alert('Cannot send message. WebSocket is not connected.');
    }
  }
  
  function addMessage(message, type, sender = null) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    if (sender && type === 'received') {
      messageElement.textContent = `${sender.substring(0, 6)}...: ${message}`;
    } else {
      messageElement.textContent = message;
    }
    
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