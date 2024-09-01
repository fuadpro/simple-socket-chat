function socketAuth(socket, authenticatedUsers, io) {

  socket.on("auth", (nickName) => {
    socket.user = {
      nickName,
    };

    authenticatedUsers.add(socket.id);

    socket.join("group-chat");

    io.emit("update-client-count", authenticatedUsers.size);
  });
}

module.exports = socketAuth;
