import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TranslationValueCell } from ".";

const meta: Meta<typeof TranslationValueCell> = {
  component: TranslationValueCell,
};

export default meta;

type Story = StoryObj<typeof TranslationValueCell>;

const Editable = ({ initial }: { initial: string }) => {
  const [value, setValue] = useState(initial);

  return <TranslationValueCell value={value} onSave={setValue} />;
};

export const Filled: Story = {
  render: () => <Editable initial="купить" />,
};

export const Empty: Story = {
  render: () => <Editable initial="" />,
};
