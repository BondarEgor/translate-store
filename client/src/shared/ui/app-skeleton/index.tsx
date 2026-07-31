import { Flex, Skeleton } from "@radix-ui/themes";
import { TableSkeleton } from "../table-skeleton";
import css from "./styles.module.css";

export const AppSkeleton = () => (
  <Flex className="app-shell">
    <Flex direction="column" gap="2" p="3" className="app-sidebar">
      <Skeleton className={css.logo} />
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className={css.item} />
      ))}
    </Flex>

    <Flex direction="column" flexGrow="1">
      <Flex className={css.header} />
      <TableSkeleton />
    </Flex>
  </Flex>
);
