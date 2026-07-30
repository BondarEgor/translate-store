import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableSkeleton } from ".";

const meta: Meta<typeof TableSkeleton> = {
  component: TableSkeleton,
};

export default meta;

type Story = StoryObj<typeof TableSkeleton>;

export const Default: Story = {};

export const FewRows: Story = {
  args: { rows: 2 },
};
