const { Server } = require("socket.io");
const socketAuth = require("./auth");
const socketMessage = require("./message");

function initSocket(httpServer) {
  const io = new Server(httpServer);

  let authenticatedUsers = new Set(); 

  io.on("connection", (socket) => {

    socketAuth(socket, authenticatedUsers, io);
    socketMessage(socket, io);

    io.emit("update-client-count", authenticatedUsers.size);  // Broadcast the count to all clients

    socket.on("disconnect", () => {
      authenticatedUsers.delete(socket.id);
      io.emit("update-client-count", authenticatedUsers.size);  // Broadcast the updated count to all clients
    });
  });
}

module.exports = initSocket;
