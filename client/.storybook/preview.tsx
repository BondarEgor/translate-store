import type { Preview } from "@storybook/react-vite";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme appearance="dark" accentColor="green" grayColor="gray">
        <Story />
      </Theme>
    ),
  ],
};

export default preview;
