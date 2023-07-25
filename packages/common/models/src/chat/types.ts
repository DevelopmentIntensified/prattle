import Message from "../message/message.js";
import { MessageDataType } from "../message/types.js";
export type chatDataType = {
  creator: string;
  name: string;
  id: string;
  users: string[];
  messageCount: number;
  deletedMessageCount: number;
  onlineUsers?: { [id: string]: string };
  admins?: string[];
};

export interface MessageHandlerType {
  savedMessageCount: number;
  deletedMessageCount: number;
  messageCount: number;
  messages: Map<string, Message>;
  deletedMessages: Map<string, Message>;
  newMessage(
    messageDataInHandler: MessageDataType,
    id?: string
  ): Promise<Message>;
  deleteMessage(id: string): Promise<void>;
  updateMessage(
    id: string,
    message: string,
    type: string,
    oldMessage: boolean
  ): Promise<void>;
  restoreRecentlyDeletedMessage(id: string): Promise<void>;
  getMessage(id: string): Promise<Message>;
  getMessages(): Promise<Map<string, Message>>;
  getMessageCount(): Promise<number>;
  getSavedMessageCount(): Promise<number>;
}
