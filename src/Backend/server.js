const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true,  // Allow credentials such as cookies, headers, etc.
  methods: 'GET,POST,PUT,DELETE',   // Specify allowed methods if needed
  allowedHeaders: 'Content-Type,Authorization',  // Specify allowed headers if needed
}));
app.use(express.json());





// Use routes
app.use("/", routes);

// Setting up WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
    console.log("Received:", message);
    ws.send("Message received by server");
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
