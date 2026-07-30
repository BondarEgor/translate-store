import { Flex, Text } from "@radix-ui/themes";

export const EmptyState = ({ text }: { text: string }) => (
  <Flex flexGrow="1" justify="center" align="center">
    <Text size="2" color="gray">
      {text}
    </Text>
  </Flex>
);
