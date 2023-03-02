import { MessageDataType } from "./types";

export default class Message {
  message: string;
  creatorAuthId: string;
  type: string;
  timeSent: number;
  timeUpdated: number;
  orderNumber: number;
  oldMessage: boolean;
  updated: boolean;
  constructor(messageData: MessageDataType) {
    this.message = messageData.message;
    this.creatorAuthId = messageData.creatorAuthId;
    this.type = messageData.type;
    this.oldMessage = !!messageData.oldMessage;
    this.updated = false;
    this.timeSent = messageData.timeSent;
    this.timeUpdated = messageData.timeUpdated;
    this.orderNumber = messageData.orderNumber;
  }
}
