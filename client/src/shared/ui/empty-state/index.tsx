import type { ReactNode } from "react";
import { Flex, Text } from "@radix-ui/themes";
import css from "./styles.module.css";

type Props = {
  text: string;
  hint?: string;
  icon?: ReactNode;
};

export const EmptyState = ({ text, hint, icon }: Props) => (
  <Flex flexGrow="1" justify="center" align="center" direction="column" gap="3" p="6">
    {icon && <Flex className={css.iconBadge}>{icon}</Flex>}
    <Text size="2" weight="medium" align="center">
      {text}
    </Text>
    {hint && (
      <Text size="1" color="gray" align="center">
        {hint}
      </Text>
    )}
  </Flex>
);
