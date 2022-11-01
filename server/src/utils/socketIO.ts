import type { Express } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const SocketServer = (socket: Socket) => {
  socket.on("joinRoom", (id: string) => {
    socket.join(id);
    console.log({ joinRoom: (socket as any).adapter.rooms });
  });

  socket.on("outRoom", (id: string) => {
    socket.leave(id);
    console.log({ outRoom: (socket as any).adapter.rooms });
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnect");
  });
};

const socketIO = (app: Express) => {
  const http = createServer(app);
  const io = new Server(http);

  io.on("connection", (socket: Socket) => {
    SocketServer(socket);
  });

  return { http, io };
};

export default socketIO;
