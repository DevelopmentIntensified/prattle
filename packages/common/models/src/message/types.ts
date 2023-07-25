export interface MessageDataType {
  message: string;
  creatorAuthId: CreatorAuthIdType;
  type: TypeOfMessage;
  timeSent: number;
  timeUpdated: number;
}

export type TypeOfMessage = "USERJOINED" | "USERLEFT" | "DEFAULT";
export type CreatorAuthIdType = "SERVER" | "CLIENT" | string;

export interface MessageType extends MessageDataType {
  oldMessage: boolean;
  updated: boolean;
  orderNumber: number;
}
