import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";

export const server = createServer(app);
export const connectedUsers = new Map<string, Set<string>>();

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST']
  }
});

// io.on('connection', (socket) => {
//   const user_id = socket.handshake.auth.user_id;
//   console.log(`User connected with user_id: ${user_id} and socket_id: ${socket.id}`);

//   if(user_id){
//     if(!connectedUsers.has(user_id)){
//       connectedUsers.set(user_id, new Set());
//     }
//     connectedUsers.get(user_id).add(socket.id)
//   }

//   console.log("connected users: ", connectedUsers)

//   socket.on('message', (msg, to_user_id) => {
//     console.log('message: ' + msg);
//     console.log('user id: ' + to_user_id);
//     if(to_user_id){
//       const targetSocket = connectedUsers.get(to_user_id);
//       targetSocket.forEach((socket_id => {
//         console.log(socket_id);
//         io.to(socket_id).emit('message', {
//           from: user_id,
//           message: msg,
//         })
//       }))
//     }
//   });

//   socket.on("disconnect", () => {
//     for (const [uid, socketSet] of connectedUsers.entries()) {
//       if (socketSet.has(socket.id)) {
//         socketSet.delete(socket.id);
//         if (socketSet.size === 0) {
//           connectedUsers.delete(uid);
//           console.log(`User ${uid} disconnected (no active sockets)`);
//         } else {
//           console.log(
//             `Socket ${socket.id} removed, user ${uid} still has active sockets`
//           );
//         }
//       }
//     }
//   });

// })









io.on('connection', (socket) => {
  const user_id = socket.handshake.auth.user_id;
  console.log(`User connected with user_id: ${user_id} and socket_id: ${socket.id}`);

  if(user_id){
    if(!connectedUsers.has(user_id)){
      connectedUsers.set(user_id, new Set());
    }
    connectedUsers.get(user_id).add(socket.id)
  }

  console.log("connected users: ", connectedUsers)



  socket.on("disconnect", () => {
    for (const [uid, socketSet] of connectedUsers.entries()) {
      if (socketSet.has(socket.id)) {
        socketSet.delete(socket.id);
        if (socketSet.size === 0) {
          connectedUsers.delete(uid);
          console.log(`User ${uid} disconnected (no active sockets)`);
        } else {
          console.log(
            `Socket ${socket.id} removed, user ${uid} still has active sockets`
          );
        }
      }
    }
  });

})

export const getReceiverSocketId = (userId:string) =>{
  return connectedUsers.get(userId);
}

