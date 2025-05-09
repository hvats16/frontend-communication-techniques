# Communication Project

This repository contains different communication methods between client and server.

## Contents

- **short-polling**: Implementation of short polling communication technique
  - A simple demonstration of client repeatedly requesting updates from server
- **long-polling**: Implementation of long polling communication technique
  - A technique where the server holds the request until new data is available
- **web-socket**: Implementation of WebSocket communication technique
  - A full-duplex communication channel over a single, long-lived connection
- **server-sent-events**: Implementation of Server-Sent Events communication technique
  - A one-way communication channel where server pushes updates to the client
- **web-hook**: Implementation of Webhook communication technique
  - An HTTP callback where a server-to-server notification is sent when an event occurs

## Getting Started

### Short Polling

1. Navigate to the short-polling directory:
   ```
   cd short-polling
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   ```
   node index.js
   ```

4. Open `index.html` in your browser to see the client-side implementation

### Long Polling

1. Navigate to the long-polling directory:
   ```
   cd long-polling
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   ```
   node index.js
   ```

4. Open `index.html` in your browser to see the client-side implementation

### WebSocket

1. Navigate to the web-socket directory:
   ```
   cd web-socket
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   ```
   node index.js
   ```

4. Open `index.html` in your browser to see the client-side implementation

### Server-Sent Events

1. Navigate to the server-sent-events directory:
   ```
   cd server-sent-events
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   ```
   node index.js
   ```

4. Open `index.html` in your browser to see the client-side implementation

### Webhook

1. Navigate to the web-hook directory:
   ```
   cd web-hook
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   ```
   node index.js
   ```

4. Test the webhook endpoint using curl:
   ```
   curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{"event": "user.created", "data": {"id": 123, "name": "John Doe", "email": "john@example.com"}}'
   ```

## Project Structure

The repository is organized into separate folders for each communication method. Each folder is a standalone implementation that can be run independently.

## Contributing

When adding new communication method implementations:
1. Create a new folder at the root level
2. Include appropriate documentation
3. Keep node_modules out of version control (handled by .gitignore) 