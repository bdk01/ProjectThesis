let users = [];

const SocketServer = (socket) => {
  socket.on("joinUser", (user) => {
      console.log("connect");
    users.push({ id: user._id, socketId: socket.id });
    console.log({users});
  });
  socket.on("disconnect", (user) => {

    users = users.filter((user) => user.socketId !== socket.id);
    console.log("user disconnect");
  });
  socket.on("send-message", (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
    console.log('addmess')
  });
};

export default SocketServer;
