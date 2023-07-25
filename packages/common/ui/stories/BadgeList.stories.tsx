import {BadgeList} from "../src/BadgeList/BadgeList";
import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

const meta = {
  title: "Components/BadgeList",
  component: BadgeList,
  decorators: [withRouter],
  tags: ["autodocs"]
} satisfies Meta<typeof BadgeList>;

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
    ]
  }
};

export const WithLinks: Story = {
  args: {
    badges: [
      {
        name: "Badge 4",
        image: "https://via.placeholder.com/150",
        type: "Gold",
        date: "2021-10-15",
        link: "https://via.placeholder.com"
      },
      {
        name: "Badge 2",
        image: "https://via.placeholder.com/150",
        type: "Silver",
        date: "2021-10-16",
        link: "https://via.placeholder.com"
      },
      {
        name: "Badge 3",
        image: "https://via.placeholder.com/150",
        type: "Bronze",
        date: "2021-10-17",
        link: "https://via.placeholder.com"
      }
    ]
  }
};