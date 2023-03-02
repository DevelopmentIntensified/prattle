//@ts-check
import { MessageHandlerType, chatDataType } from "./types.js";

class Chat {
  creator: string;
  name: string;
  id: string;
  users: Set<string>;
  onlineUsers: Map<string, string>;
  MessageHandler: MessageHandlerType;
  admins: Set<string>;
  lastSync: number;

  constructor(
    { name, creator, id, users, admins, onlineUsers }: chatDataType,
    messageHandler: MessageHandlerType
  ) {
    this.name = name;
    this.creator = creator;
    this.id = id;
    this.users = new Set(users);
    this.onlineUsers = new Map(onlineUsers && Object.entries(onlineUsers));
    this.MessageHandler = messageHandler;
    this.admins = new Set(admins);
    this.lastSync = Date.now();
  }

  // async getUserAuthId(socketId: string) {
  //   return this.onlineUsers.get(socketId);
  // }

  // async addUserToChat(
  //   userSocketId: string,
  //   userAuthId: string
  // ): Promise<typeof this> {
  //   if (!this.users.has(userAuthId)) {
  //     this.users.add(userAuthId);
  //   }
  //   this.onlineUsers.set(userSocketId, userAuthId);
  //   return this;
  // }
}

export default Chat;
