import type { ReactNode } from "react";
import { Button, Flex } from "@radix-ui/themes";
import css from "./styles.module.css";

type Props = {
  active?: boolean;
  onClick?: () => void;
  action?: ReactNode;
  children: ReactNode;
};

export const NavRow = ({ active, onClick, action, children }: Props) => (
  <Flex align="center" gap="1" px="1">
    <Button
      variant={active ? "soft" : "ghost"}
      color={active ? undefined : "gray"}
      onClick={onClick}
      className={css.button}
    >
      {children}
    </Button>
    {action}
  </Flex>
);
