import { Box, Flex, IconButton, ChevronDownIcon, Text } from "@radix-ui/themes";
import { useState } from "react";

export const NavSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Box px="1">
      <Flex align="center" justify="between" px="2" py="1">
        <Text size="1" weight="medium" color="gray">
          {label}
        </Text>
        <IconButton
          size="1"
          variant="ghost"
          color="gray"
          aria-label={`Свернуть ${label}`}
          onClick={() => setOpen((v) => !v)}
          style={{ transform: open ? "rotate(180deg)" : "none" }}
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
