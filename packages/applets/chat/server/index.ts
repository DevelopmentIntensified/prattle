import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "@prattle/chat-shared";
import { Namespace } from "socket.io/dist/namespace";

export default async (io: Server) => {
  const chatNamespace: Namespace<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  > = io.of("/chat");

  const userNamespace: Namespace<object, object, InterServerEvents, object> =
    io.of("/user");

  chatNamespace.on("connection", (socket) => {
    socket.on("created", (data) => {
      userNamespace.serverSideEmit("userJoinedChat", socket.id);
    });
  });
};
