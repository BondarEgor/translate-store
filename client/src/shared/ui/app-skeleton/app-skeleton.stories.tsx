import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppSkeleton } from ".";

const meta: Meta<typeof AppSkeleton> = {
  component: AppSkeleton,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof AppSkeleton>;

export const Boot: Story = {};
