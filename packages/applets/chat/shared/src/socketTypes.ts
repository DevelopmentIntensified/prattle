import { deserializedChatType } from "./chatTypes";

type chatCreatedClient = {
  name: string;
};

type chatIdClientEvent = {
  chatId: string;
};

export interface ClientToServerEvents {
  created: (data: chatCreatedClient) => void;
  joined: (data: chatIdClientEvent) => void;
  deleted: (data: chatIdClientEvent) => void;
}

export interface ServerToClientEvents {
  created: (data: deserializedChatType) => void;
  joined: (data: deserializedChatType) => void;
  client_joined: (data: deserializedChatType) => void;
  deleted: (data: chatIdClientEvent) => void;
}

export interface InterServerEvents {
  userJoinedChat: (data: chatIdClientEvent) => void;
}

export interface SocketData {
  uid: string | undefined;
}
