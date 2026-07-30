import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationKeyName } from ".";

const meta: Meta<typeof TranslationKeyName> = {
  component: TranslationKeyName,
};

export default meta;

type Story = StoryObj<typeof TranslationKeyName>;

export const Default: Story = {
  args: {
    row: { namespace: "home", key: "home.hero.title", value: "Привет", locale: "ru" },
  },
};
