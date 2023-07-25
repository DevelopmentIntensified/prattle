import { Socket } from "socket.io";
import {
  userJoinedChatMessage
} from "@prattle/chat-shared";
import { MessageDataType, chatDataType } from "@prattle/models";
import Chat from "@prattle/models/src/chat/chat";
import MessageHandler from "../messageHandler/messageHandler";
import { checkIfChatExistsInDatabase, deleteChatFromDatabase, getNewChatIdFromDatabase, getNewMessageId } from "@prattle/database";
import { serialize } from "@prattle/utils";

class ChatEventManager {
  chats: Map<string, Chat>;
  constructor() {
    this.chats = new Map();
  }

  async isChatActive(chatId: string) {
    return this.chats.has(chatId);
  }

  async getChat(chatId: string) {
    return this.chats.get(chatId);
  }

  async activateChat(chatId: string, chatData: chatDataType) {
    this.chats.set(
      chatId,
      new Chat(
        {
          name: chatData.name,
          creator: chatData.creator,
          id: chatId,
          users: chatData.users,
          messageCount: chatData.messageCount,
          deletedMessageCount: chatData.deletedMessageCount
        },
        new MessageHandler(
          chatData.messageCount,
          chatData.messageCount,
          chatData.deletedMessageCount
        )
      )
    );
  }

  async sendUserJoinedMessage(chatId: string, userAuthId: string) {
    const timesent = Date.now();
    await this.newMessage(chatId, {
      type: "USERJOINED",
      creatorAuthId: "",
      message: await userJoinedChatMessage(userAuthId),
      timeSent: timesent,
      timeUpdated: timesent
    });
  }

  async newMessage(chatId: string, messageData: MessageDataType) {
    const messageId = await getNewMessageId(chatId);
    const chat = await this.getChat(chatId);
    await chat?.MessageHandler.newMessage(messageData, messageId);
  }

  async deleteChat(chatId: string): Promise<Set<string>> {
    const chat = await this.getChat(chatId)?;
    const chatUsers = chat.users;

    this.chats.delete(chatId);
    return chatUsers;
  }

  async getSerializedChats(): Promise<{
    [chatId: string]: string;
  }> {
    const serializedChats: { [id: string]: string } = {};
    for (const entry of this.chats) {
      const chatId: string = entry[0] as string;
      const chat: Chat = entry[1] as Chat;
      serializedChats[chatId] = serialize(chat);
    }
    return serializedChats;
  }

  async userJoined(
    userSocketId: string,
    chatId: string,
    userAuthId: string,
    socket: Socket
  ): Promise<{ chat: Chat; userHasJoinedBefore: boolean }> {
    console.log("user joined " + chatId);
    if (!(await this.isChatActive(chatId))) {
      const chatData = await checkIfChatExistsInDatabase(chatId);
      await this.activateChat(chatId, chatData);
      console.log("chat has found and activated");
    }
    const chat = await this.getChat(chatId);
    const userHasJoinedBefore = chat?.users.has(userAuthId);
    socket.join(chatId);
    await chat?.addUserToChat(userSocketId, userAuthId);
    if (!userHasJoinedBefore) {
      await this.sendUserJoinedMessage(chatId, userAuthId);
    }
    return {
      chat: await this.getChat(chatId),
      userHasJoinedBefore
    };
  }

  async chatCreated(userAuthId: string, chatName?: string): Promise<Chat> {
    const chatId = await getNewChatIdFromDatabase();
    if (!chatName) {
      chatName = `Chat that no one Named ${(Math.random() * 100000).toFixed(
        0
      )}`;
    }
    const chat = new Chat({
      name: chatName,
      creator: userAuthId,
      id: chatId,
      users: [],
      messageCount: 0,
      deletedMessageCount: 0
    });
    chat.admins.add(userAuthId);
    this.chats.set(chatId, chat);
    return await this.getChat(chatId);
  }

  async chatDeleted(chatId: string, socketId: string): Promise<string[]> {
    const chat = await this.getChat(chatId);

    if (!chat.onlineUsers.has(socketId)) {
      throw new Error("User must be an onlineUser in order to delete a chat!");
    }
    const userAuthId = await chat.getUserAuthId(socketId);
    if (!chat.admins.has(userAuthId)) {
      throw new Error("User must be an admin in order to delete the chat!");
    }

    await deleteChatFromDatabase(
      chatId,
      (await chat.MessageHandler.getSavedMessageCount()) -
        chat.MessageHandler.deletedMessageCount
    );

    const affectedUsers = await this.deleteChat(chatId);
    return Array.from(affectedUsers);
  }
}

export default ChatEventManager;
export const chatEventManager: ChatEventManager = new ChatEventManager();
