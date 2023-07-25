import { chatsCollection } from "./db.js";
import { deleteMessages } from "./messageData.js";
import { chatDataType } from "@prattle/models";

export const getChatFromDatabase = async (
  chatId: string
): Promise<
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
> => {
  return await chatsCollection.doc(chatId).get();
};

export const deleteChatFromDatabase = async (
  chatId: string,
  savedMessageCount: number
) => {
  await deleteMessages(chatId, savedMessageCount);
  await chatsCollection.doc(chatId).delete();
};

export const checkIfChatExistsInDatabase = async (
  chatId: string
): Promise<chatDataType> => {
  const chatRef = await getChatFromDatabase(chatId);
  if (!chatRef.exists) throw Error(`no Chat with ID: ${chatId} exists`);
  const chatData = chatRef.data();
  if (!chatData || !chatData.name)
    throw Error(`Chat with ID: ${chatId} exists, but has no data`);
  return chatData as chatDataType;
};

export const getNewChatIdFromDatabase = async (): Promise<string> =>
  await chatsCollection.doc().id;
