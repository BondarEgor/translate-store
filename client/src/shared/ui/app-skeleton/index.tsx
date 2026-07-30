import { Flex, Skeleton } from "@radix-ui/themes";
import { TableSkeleton } from "../table-skeleton";

const BORDER = "1px solid var(--gray-a4)";

export const AppSkeleton = () => (
  <Flex className="app-shell">
    <Flex direction="column" gap="2" p="3" className="app-sidebar">
      <Skeleton style={{ width: 140, height: 20 }} />
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} style={{ width: "80%", height: 14 }} />
      ))}
    </Flex>

    <Flex direction="column" flexGrow="1">
      <Flex height="56px" flexShrink="0" style={{ borderBottom: BORDER }} />
      <TableSkeleton />
    </Flex>
  </Flex>
);
