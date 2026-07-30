import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from ".";

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const NoKeys: Story = {
  args: { text: "Ключей пока нет" },
};

export const PickTable: Story = {
  args: { text: "Выберите таблицу и язык" },
};
