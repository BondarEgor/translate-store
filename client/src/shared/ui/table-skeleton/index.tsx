import { Flex, Skeleton } from "@radix-ui/themes";
import { KEYS_TABLE_BORDER } from "@/shared/constants/keys-table";

export const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <Flex direction="column" flexGrow="1">
    {Array.from({ length: rows }, (_, index) => (
      <Flex
        key={index}
        align="center"
        gap="3"
        px="4"
        py="3"
        style={{ borderBottom: KEYS_TABLE_BORDER }}
      >
        <Skeleton style={{ width: 120, height: 16 }} />
        <Skeleton style={{ width: "40%", height: 16 }} />
      </Flex>
    ))}
  </Flex>
);
