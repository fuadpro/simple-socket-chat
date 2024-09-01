const { Server } = require("socket.io");
const socketAuth = require("./auth");
const socketMessage = require("./message");

function initSocket(httpServer) {
  const io = new Server(httpServer);

  let connectedClients = 0; 

  io.on("connection", (socket) => {
    connectedClients++;
    io.emit("update-client-count", connectedClients);  // Broadcast the count to all clients
    
    socketAuth(socket);
    socketMessage(socket, io);

    socket.on("disconnect", () => {
      connectedClients--;
      io.emit("update-client-count", connectedClients);  // Broadcast the updated count to all clients
    });
  });
}

module.exports = initSocket;
