const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Middleware
app.use(bodyParser.json());

// Webhook endpoint
app.post("/webhook", (req, res) => {
  try {
    const payload = req.body;

    // Validate payload
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ error: "Empty payload" });
    }

    // Log webhook data
    console.log("Webhook received:", JSON.stringify(payload, null, 2));

    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
