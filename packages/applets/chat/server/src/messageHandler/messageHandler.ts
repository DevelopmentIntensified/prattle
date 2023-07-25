import { MessageDataType, MessageType } from "@prattle/models";
import Message from "@prattle/models/src/message/message";

export default class MessageHandler {
  messages: Map<string, Message>;
  deletedMessages: Map<string, Message>;

  constructor(
    public messageCount: number,
    public savedMessageCount: number,
    public deletedMessageCount: number
  ) {
    this.messages = new Map<string, Message>();
    this.deletedMessages = new Map<string, Message>();
  }

  private async messageIdExists(id: string) {
    if (!this.messages.has(id)) {
      throw new Error(`Message with ID ${id} does not exist`);
    }
  }

  private async deletedMessageIdExists(id: string) {
    if (!this.deletedMessages.has(id)) {
      throw new Error(
        `Message with ID ${id} does not exist in recently deleted Messages`
      );
    }
  }

  private async messageIdNotEmpty(id: string) {
    if (!id) {
      throw new Error("Message ID is required");
    }
  }

  private async messageIdValidator(id: string) {
    await this.messageIdNotEmpty(id);
    await this.messageIdExists(id);
  }

  async newMessage(
    messageDataInHandler: MessageDataType,
    id: string,
    orderNumber?: number
  ) {
    const messageData = {
      ...messageDataInHandler,
      oldMessage: false,
      orderNumber: orderNumber ? orderNumber : await this.getMessageCount(),
      updated: false
    };
    this.messages.set(id, new Message(messageData));
    if (!orderNumber) {
      this.messageCount++;
    }
    return this.getMessage(id);
  }

  async updateMessage(id: string, newMessage: string) {
    await this.messageIdValidator(id);
    const message = await this.getMessage(id);
    message.message = newMessage;
    message.updated = true;
    message.timeUpdated = Date.now();
  }

  async deleteMessage(id: string) {
    this.deletedMessages.set(id, await this.getMessage(id));
    this.messages.delete(id);
    this.deletedMessageCount++;
  }

  async restoreRecentlyDeletedMessage(id: string) {
    this.messages.set(id, await this.getDeletedMessage(id));
    this.deletedMessages.delete(id);
    this.deletedMessageCount--;
  }

  async getMessage(id: string): Promise<Message> {
    await this.messageIdValidator(id);
    return this.messages.get(id) as Message;
  }

  async getDeletedMessage(id: string): Promise<Message> {
    await this.messageIdNotEmpty(id);
    await this.deletedMessageIdExists(id);
    return this.deletedMessages.get(id) as Message;
  }

  async getMessages() {
    return this.messages;
  }

  async getDeletedMessages() {
    return this.deletedMessages;
  }

  async getMessageCount() {
    return this.messageCount;
  }

  async getSavedMessageCount() {
    return this.savedMessageCount;
  }
}
