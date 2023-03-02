export interface MessageDataType {
  message: string;
  creatorAuthId: string;
  type: string;
  timeSent: number;
  timeUpdated: number;
  orderNumber: number;
  oldMessage: boolean;
}
