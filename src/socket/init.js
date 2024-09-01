const { Server } = require("socket.io");
const socketAuth = require("./auth");
const socketMessage = require("./message");

function initSocket(httpServer) {
  const io = new Server(httpServer);

  let authenticatedUsers = new Set(); 

  const users = new Map();

  io.on("connection", (socket) => {

    socketAuth(socket, authenticatedUsers, users, io);
    socketMessage(socket, io);

    io.emit("update-user-list", Array.from(users.values()));
    io.emit("update-client-count", authenticatedUsers.size);  // Broadcast the count to all clients

    socket.on("disconnect", () => {
      users.delete(socket.id);
      io.emit("update-user-list", Array.from(users.values()));
      
      authenticatedUsers.delete(socket.id);
      io.emit("update-client-count", authenticatedUsers.size);  // Broadcast the updated count to all clients
    });
  });
}

module.exports = initSocket;
