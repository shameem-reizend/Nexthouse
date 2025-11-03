import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (user_id: string) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: {user_id}
    });
  }
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
};
