import { Button, Flex } from "@radix-ui/themes";

export const NavRow = ({
  active,
  onClick,
  action,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Flex align="center" gap="1" px="1">
      <Button
        variant={active ? "soft" : "ghost"}
        color="gray"
        highContrast={active}
        onClick={onClick}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: "flex-start",
          margin: 0,
        }}
      >
        {children}
      </Button>
      {action}
    </Flex>
  );
};
