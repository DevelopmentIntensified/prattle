import { getChatFromDatabase } from "./chatData.js";
import { deleteCollection, messageCollection } from "./db.js";

export const getMessage = async (chatId: string, messageId: string) =>
  await messageCollection(chatId).doc(messageId).get();
export const getNewMessageId = async (chatId: string) =>
  await messageCollection(chatId).doc().id;
export const getMessages = async (chatId: string, limit?: number) => {
  return;
};
export const deleteMessages = async (chatId: string, count: number) => {
  // for(let i = 0; i < count;i += 25){
  //   console.log(count);
  await deleteCollection(`chats/${chatId}/messages`, 25);
  // }
};
export const getSavedMessageCount = async (chatId: string) =>
  await (await getChatFromDatabase(chatId)).data()?.messageCount;
