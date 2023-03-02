export interface MessageDataType {
  message: string;
  creatorAuthId: string;
  type: string;
  timeSent: number;
  timeUpdated: number;
  orderNumber: number;
}

export interface MessageType extends MessageDataType {
  oldMessage: boolean;
  updated: boolean;
}

export interface serializedMessageHandlerType {
  savedMessageCount: number;
  deletedMessageCount: number;
  messageCount: number;
  messages: { [id: string]: MessageType };
  deletedMessages: { [id: string]: MessageType };
}

export type serializedChatType = {
  creator: string;
  name: string;
  id: string;
  users: string[];
  onlineUsers: { [id: string]: string };
  MessageHandler: serializedMessageHandlerType;
  admins: string[];
  lastSync: number;
};
