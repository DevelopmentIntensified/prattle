import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { Nav } from "../src/nav/Nav";

const meta = {
  title: "Components/Navbar",
  component: Nav,
  decorators: [withRouter],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen"
  }
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

const routes2 = [
  ["test", "/test"],
  ["test2", "/test2"]
];

export const LoggedIn: Story = {
  args: {
    routes: routes2,
    loggedIn: true,
    profileRoute: "/profile",
    loginRoute: "/login",
    logoutRoute: "/logout"
  }
};

export const LoggedOut: Story = {
  args: {
    routes: [],
    loggedIn: false,
    profileRoute: "/profile",
    loginRoute: "/login",
    logoutRoute: "/logout"
  }
};

export const LoggedInPage: Story = {
  args: {
    routes: routes2,
    loggedIn: true,
    profileRoute: "/profile",
    loginRoute: "/login",
    logoutRoute: "/logout"
  },
  parameters: {
    reactRouter: {
      routePath: "/profile/:userId",
      routeParams: { userId: "42" }
    }
  }
};
