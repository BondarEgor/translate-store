import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobeIcon } from "@radix-ui/react-icons";
import { EmptyState } from ".";

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Text: Story = {
  args: { text: "Ключей пока нет" },
};

export const WithIconAndHint: Story = {
  args: {
    text: "Выберите таблицу и язык",
    hint: "Список таблиц — слева",
    icon: <GlobeIcon width="20" height="20" />,
  },
};
