const express = require("express");
const app = express();
const port = 3000;

let todosCollection = [];

async function getTodos() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    todosCollection = await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Initial data fetch
getTodos();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getdata", (req, res) => {
  const id = parseInt(req.query.id);

  if (todosCollection && todosCollection.length > 0) {
    // Find the todo with the requested ID (limited to the first 10)
    if (id <= 10) {
      const todoToSend = todosCollection.find((todo) => todo.id === id);
      if (todoToSend) {
        return res.json({ message: todoToSend });
      }
    }
  }

  // If ID > 10 or todo not found, return signal to stop polling
  return res.json({ message: { stop: true } });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
