import { io } from "socket.io-client";

let socket;
const REST_API = process.env.REACT_APP_API;
export const getSocket = () => {
  if (!socket) {
    socket = io(REST_API, {
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
};
