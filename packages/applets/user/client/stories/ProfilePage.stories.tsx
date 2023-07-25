import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { ProfilePage } from "../src/profilePage/ProfilePage";

const meta = {
  title: "Components/BadgeList",
  component: ProfilePage,
  decorators: [withRouter],
  tags: ["autodocs"]
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  args: {
    badges: [
      {
        name: "Badge 4",
        image: "https://via.placeholder.com/150",
        type: "Gold",
        date: "2021-10-15"
      },
      {
        name: "Badge 2",
        image: "https://via.placeholder.com/150",
        type: "Silver",
        date: "2021-10-16"
      },
      {
        name: "Badge 3",
        image: "https://via.placeholder.com/150",
        type: "Bronze",
        date: "2021-10-17"
      }
    ],
    username: "hi",
    joinedDate: new Date(),
    imageUrl: "https://via.placeholder.com/150"
  }
};
