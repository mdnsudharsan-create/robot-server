const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.get("/", (req, res) => {
  res.send("🚗 Server running");
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("control", (data) => {
    io.emit("control", data);
  });

  socket.on("battery", (val) => {
    io.emit("battery", val);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
