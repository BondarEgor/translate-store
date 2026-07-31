import { useState, type ReactNode } from "react";
import { Box, ChevronDownIcon, Flex, IconButton, Text } from "@radix-ui/themes";
import css from "./styles.module.css";

export const NavSection = ({ label, children }: { label: string; children: ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box px="1">
      <Flex align="center" justify="between" px="2" py="1">
        <Text size="1" weight="medium" className={css.label}>
          {label}
        </Text>
        <IconButton
          size="1"
          variant="ghost"
          color="gray"
          aria-label={`Свернуть ${label}`}
          onClick={() => setOpen((v) => !v)}
          className={open ? css.chevronOpen : css.chevron}
        >
          <ChevronDownIcon />
        </IconButton>
      </Flex>
      {open && (
        <Flex direction="column" gap="1" mt="1">
          {children}
        </Flex>
      )}
    </Box>
  );
};
