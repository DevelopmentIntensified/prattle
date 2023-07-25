import { BadgeListProps } from "@prattle/ui";

export interface UserData {
  username: string;
  joinedDate: Date;
  extraMetaData: Record<string, any>;
  imageUrl: string;
  badges: BadgeListProps
}