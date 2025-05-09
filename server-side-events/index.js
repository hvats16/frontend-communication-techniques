const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");

  res.flushHeaders();
  let interval;

  res.write("data: Hello, world!\n\n");
  interval = setInterval(() => {
    res.write(`data : Server time is ${new Date().toLocaleTimeString()}\n\n`);
  }, 5000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
