const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Simple test route
app.get("/", (req, res) => {
  res.send("🚗 Robot server is running!");
});

// When client connects
io.on("connection", (socket) => {
  console.log("🔌 Client connected");

  // Receive control data from phone
  socket.on("control", (data) => {
    console.log("🎮 Control:", data);

    // Send to all (ESP32 or other clients)
    io.emit("control", data);
  });

  // Receive battery from ESP32
  socket.on("battery", (value) => {
    console.log("🔋 Battery:", value);
    io.emit("battery", value);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
