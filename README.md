# Communication Project

This repository contains different communication methods between client and server.

## Contents

- **short-polling**: Implementation of short polling communication technique
  - A simple demonstration of client repeatedly requesting updates from server

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

## Project Structure

The repository is organized into separate folders for each communication method. Each folder is a standalone implementation that can be run independently.

## Contributing

When adding new communication method implementations:
1. Create a new folder at the root level
2. Include appropriate documentation
3. Keep node_modules out of version control (handled by .gitignore) 