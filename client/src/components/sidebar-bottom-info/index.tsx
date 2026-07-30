import { Stats } from "@/api";
import { plural } from "@/lib/plural";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

export const SidebarBottomInfo = ({ stats }: { stats: Stats }) => {
  return (
    <Flex
      align="center"
      gap="2"
      px="3"
      py="2"
      flexShrink="0"
      style={{ borderTop: "1px solid var(--gray-a4)" }}
    >
      <GlobeIcon />
      <Text size="1" color="gray">
        {stats.tables} {plural(stats.tables, "таблица", "таблицы", "таблиц")} · {stats.languages}{" "}
        {plural(stats.languages, "язык", "языка", "языков")} · {stats.keys}{" "}
        {plural(stats.keys, "ключ", "ключа", "ключей")}
        {stats.missing > 0 && ` · ждут ${stats.missing}`}
      </Text>
    </Flex>
  );
};
