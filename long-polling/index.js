const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const waitList = [];
const data = { id: "" };

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/get-data", (req, res) => {
  if (data.id !== req.query.data) {
    res.json({ data: data });
  } else {
    waitList.push(res);
  }
});

app.get("/update-data", (req, res) => {
  data.id = req.query.data;
  if (waitList.length > 0) {
    const client = waitList.pop();
    client.json({ data });
  }
  res.status(200).json({ message: "Data updated successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
