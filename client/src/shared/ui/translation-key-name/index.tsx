import { Text } from "@radix-ui/themes";
import type { Translation } from "@/api";
import { KEYS_TABLE_MONO } from "@/shared/constants/keys-table";

export const TranslationKeyName = ({ row }: { row: Translation }) => (
  <Text as="div" size="2" weight="medium" truncate style={KEYS_TABLE_MONO}>
    {row.key.split(".").pop()}
  </Text>
);
