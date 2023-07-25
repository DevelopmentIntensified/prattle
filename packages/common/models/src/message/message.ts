import { MessageType } from "./types";

export default class Message {
  message: string;
  creatorAuthId: string;
  type: string;
  timeSent: number;
  timeUpdated: number;
  orderNumber: number;
  oldMessage: boolean;
  updated: boolean;
  constructor(messageData: MessageType) {
    this.message = messageData.message;
    this.creatorAuthId = messageData.creatorAuthId;
    this.type = messageData.type;
    this.updated = false;
    this.timeSent = messageData.timeSent;
    this.timeUpdated = messageData.timeUpdated;
    this.oldMessage = messageData.oldMessage;
    this.orderNumber = messageData.orderNumber;
  }
}
