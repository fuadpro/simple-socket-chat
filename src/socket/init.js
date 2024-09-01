const { Server } = require("socket.io");
const socketAuth = require("./auth");
const socketMessage = require("./message");

function initSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socketAuth(socket);
    socketMessage(socket, io);
  });
}

module.exports = initSocket;
