function socketAuth(socket, authenticatedUsers, users, io) {

  socket.on("auth", (nickName) => {
    socket.user = {
      nickName,
    };

    authenticatedUsers.add(socket.id);

    users.set(socket.id, { id: socket.id, nickName });

    socket.join("group-chat");

    io.emit("update-user-list", Array.from(users.values()));
    io.emit("update-client-count", authenticatedUsers.size);
  });
}

module.exports = socketAuth;
