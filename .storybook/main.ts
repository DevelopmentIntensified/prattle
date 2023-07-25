import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  typescript: {
    reactDocgen: 'react-docgen', // 👈 react-docgen configured here.
  },
  docs: {
    autodocs: "tag"
  }
};
export default config;
