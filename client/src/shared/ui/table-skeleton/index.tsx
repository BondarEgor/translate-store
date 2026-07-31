import { Flex, Skeleton } from "@radix-ui/themes";
import css from "./styles.module.css";

export const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <Flex direction="column" flexGrow="1">
    {Array.from({ length: rows }, (_, index) => (
      <Flex key={index} align="center" gap="3" px="4" flexShrink="0" className={css.row}>
        <Skeleton className={css.key} />
        <Skeleton className={css.value} />
      </Flex>
    ))}
  </Flex>
);
