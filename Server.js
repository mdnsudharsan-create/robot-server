const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("control", (data) => {
    io.emit("control", data.steer + "," + data.move);
  });

  socket.on("battery", (val) => {
    io.emit("battery", val);
  });
});

// simple route (so browser shows something)
app.get("/", (req, res) => {
  res.send("Robot server is running 🚗");
});

server.listen(process.env.PORT || 3000);