import { Text } from "@radix-ui/themes";
import type { Translation } from "@/entities/translations/types";
import css from "./styles.module.css";

export const TranslationKeyName = ({ row }: { row: Translation }) => (
  <Text as="div" size="2" weight="medium" truncate className={css.name}>
    {row.key.split(".").pop()}
  </Text>
);
