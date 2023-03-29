import { v4 as uuidv4 } from "uuid";

let rooms = {};
let chats = {};
const SocketServer = (socket) => {
 
   const createRoom = ()=>{
    const roomId = uuidv4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
    console.log("user created the room");
   }
     const leaveRoom = ({ roomId, peerId }) => {
    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
    socket.to(roomId).emit("user-disconnected", peerId);
  };
  const joinRoom = ({roomId,peerId}) => {
   if (!rooms[roomId]) rooms[roomId] = {};
    console.log('user joinroom', roomId,peerId)
    rooms[roomId].push(peerId)
    socket.join(roomId);
    console.log(roomId)
    socket.to(roomId).emit("user-joined", { peerId });
    console.log('asd')
    socket.emit('get-users',{
        roomId,
        participants:rooms[roomId]
    })
    
  
        socket.on("disconnect", () => {
          console.log("user left the room", peerId);
          leaveRoom({ roomId, peerId });
        });
  }

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
};
/*  socket.on("joinUser", (user) => {
      console.log("connect");
    users.push({ id: user._id, socketId: socket.id });
    console.log({users});
  });
  socket.on("disconnect", (user) => {

    users = users.filter((user) => user.socketId !== socket.id);
    console.log("user disconnect");
  }); */
/*  socket.on("send-message", (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
    console.log('addmess')
  }); */
export default SocketServer;
