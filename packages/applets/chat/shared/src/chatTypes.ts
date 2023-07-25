import { MessageType } from "@prattle/models";
export interface deserializedMessageHandlerType {
  savedMessageCount: number;
  deletedMessageCount: number;
  messageCount: number;
  messages: { [id: string]: MessageType };
  deletedMessages: { [id: string]: MessageType };
}

export type deserializedChatType = {
  creator: string;
  name: string;
  id: string;
  users: string[];
  onlineUsers: { [id: string]: string };
  MessageHandler: deserializedMessageHandlerType;
  admins: string[];
  lastSync: number;
};
