// import { createServer } from "http";
// import { io as Client, Socket as ClientSocket } from "socket.io-client";
// import { Server, Socket } from "socket.io";
// import { AddressInfo } from "net";
// import { ClientToServerEvents, ServerToClientEvents, SocketData, InterServerEvents } from "../../../src/sockets/types.js";


// export const socketSetup = async (middleWares: ((socket: Socket) => void)[]) : Promise<{
//   io: Server,
//   serverSocket: Socket,
//   serverSocket2: Socket,
//   clientSocket: ClientSocket,
//   clientSocket2: ClientSocket,
// }> => {
//   let serverSocket2: Socket, clientSocket: ClientSocket, clientSocket2:ClientSocket;
//   const httpServer = createServer();
//   const io = new Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>(httpServer);
//   const serverSocket = await new Promise((resolve) => {
//     httpServer.listen(() => {
//       const { port } = httpServer.address() as AddressInfo;
//       clientSocket2 = Client(`http://localhost:${port}`);
//       io.on("connection", (socket) => {
//         for(const i in middleWares) {
//           middleWares[i](socket);
//         }
//         console.log(socket.id);
//         if(serverSocket2) {
//           resolve(socket);
//         } else {
//           clientSocket = Client(`http://localhost:${port}`);
//           serverSocket2 = socket;
//         }
//       });
//     });
//   }) as Socket;
//   return {io, serverSocket, serverSocket2, clientSocket, clientSocket2};
// };