function socketMessage(socket, io) {
  socket.on("message", (message) => {
    if (!socket.user) return;
    socket.to("group-chat").emit("new-message", {
      nickName: socket.user.nickName,
      message,
    });
  });
}

module.exports = socketMessage;
