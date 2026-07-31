import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SyncTranslations } from ".";

const queryClient = new QueryClient();

const meta: Meta<typeof SyncTranslations> = {
  component: SyncTranslations,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SyncTranslations>;

export const Default: Story = {};
