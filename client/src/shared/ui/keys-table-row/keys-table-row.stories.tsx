import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeysTableRow } from ".";

const queryClient = new QueryClient();

const meta: Meta<typeof KeysTableRow> = {
  component: KeysTableRow,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  args: {
    namespace: "home",
    defaultLocale: "ru",
  },
};

export default meta;

type Story = StoryObj<typeof KeysTableRow>;

export const Editable: Story = {
  args: {
    row: { namespace: "home", key: "buy", value: "купить", locale: "ru" },
  },
};

export const Missing: Story = {
  args: {
    row: { namespace: "home", key: "buy", value: "", locale: "en" },
    pullValue: "купить",
  },
};

export const OtherLocale: Story = {
  args: {
    row: { namespace: "home", key: "buy", value: "buy", locale: "en" },
    defaultLocale: "ru",
  },
};
