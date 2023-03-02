export interface userDataFromDatabase {
  email: string;
  userName: string;
  role: string;
  friends: string[];
  banned: boolean;
  settings: {
    nameColor: string;
    profileImgURL: string;
    useDefaultImg: boolean;
    useCustomImg: boolean;
  };
  chats: {
    [chatId: string]: {
      lastSeenMessage: number;
      veiws: number;
      lastViewed: number;
    };
  };
}
