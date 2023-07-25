export const userJoinedChatMessage = (userAuthId?: string) =>
  `Prattler @{${userAuthId}} joined the chat!`;
export const userDeletedChatMessage = (userAuthId?: string) =>
  `Prattler @{${userAuthId}} deleted the chat!`;
