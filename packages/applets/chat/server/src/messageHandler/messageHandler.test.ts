import { describe, it, expect } from "vitest";
import messages from "@prattle/testing/data/messages.json";
import MessageHandler from "./messageHandler.js";
import { MessageDataType } from "@prattle/models";

const messageHandler = new MessageHandler(0, 0, 0);
describe("message handler class", () => {
  it.each(
    messages.messages as (Omit<MessageDataType, "timeSent" | "timeUpdated"> & {
      id: string;
    })[]
  )(
    "should be able to create a message with a valid id from data: %o",
    async (messageData) => {
      await messageHandler.newMessage(
        {
          ...messageData,
          timeSent: Date.now(),
          timeUpdated: Date.now()
        },
        messageData.id
      );

      const createdMessage = await messageHandler.getMessage(messageData.id);

      expect(createdMessage?.creatorAuthId).toBe(messageData.creatorAuthId);
      expect(createdMessage?.message).toBe(messageData.message);
      expect(createdMessage?.oldMessage).toBeFalsy();
      expect(createdMessage?.updated).toBeFalsy();
      expect(createdMessage?.type).toBe(messageData.type);
      expect(createdMessage?.orderNumber).toBeTypeOf("number");
    }
  );
  it.each(
    messages.messages as (Omit<MessageDataType, "timeSent" | "timeUpdated"> & {
      id: string;
    })[]
  )("should update a message with data: %o", async (messageData) => {
    const newMessageText = "hi TESTTESTTEST";
    const messageClass = await messageHandler.getMessage(messageData.id);
    const timeUpdated = messageClass?.timeUpdated;
    await messageHandler.updateMessage(messageData.id, newMessageText);

    expect(messageClass?.message).toBe(newMessageText);
    expect(messageClass?.updated).toBeTruthy();
    expect(messageClass?.timeUpdated).not.toBe(timeUpdated);
  });
  it.each(
    messages.messages as (Omit<MessageDataType, "timeSent" | "timeUpdated"> & {
      id: string;
    })[]
  )("should delete a message with data: %o", async (message) => {
    await messageHandler.deleteMessage(message.id);

    const messages = await messageHandler.getMessages();
    const deletedMessages = await messageHandler.getDeletedMessages();

    expect(messages.has(message.id)).toBeFalsy();
    expect(deletedMessages.has(message.id)).toBeTruthy();
  });
  it.each(
    messages.messages as (Omit<MessageDataType, "timeSent" | "timeUpdated"> & {
      id: string;
    })[]
  )(
    "should restore recently deleted message with data: %o",
    async (message) => {
      await messageHandler.restoreRecentlyDeletedMessage(message.id);

      const messages = await messageHandler.getMessages();
      const deletedMessages = await messageHandler.getDeletedMessages();

      expect(messages.has(message.id)).toBe(true);
      expect(deletedMessages.has(message.id)).toBe(false);
      console.log(messageHandler);
    }
  );
});
