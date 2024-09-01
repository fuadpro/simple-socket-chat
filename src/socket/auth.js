function socketAuth(socket) {
  socket.on("auth", (nickName) => {
    socket.user = {
      nickName,
    };

    socket.join("group-chat");
  });
}

module.exports = socketAuth;
