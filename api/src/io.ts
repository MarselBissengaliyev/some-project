import { Server as HttpServer } from "http";
import { Server } from "socket.io";

interface EmitToClient {
  event: string;
  message: string;
}

let io: Server;

export const init = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: [
        "https://front.roiup.team",
        "http://localhost:3000",
        "https://klensowter.click",
      ],
    },
  });

  io.on("connection", (socket) => {
    console.log(`You connect with id ${socket.id}`);
  });
};

export const emitIo = ({ event, message }: EmitToClient) => {
  io.emit(event, message);
};
