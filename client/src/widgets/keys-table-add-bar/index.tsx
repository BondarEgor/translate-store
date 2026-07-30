import { useState } from "react";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { KEYS_TABLE_BORDER, KEYS_TABLE_MONO } from "@/shared/constants/keys-table";
import { plural } from "@/lib/plural";
import { AddTranslation } from "@/features/add-translation";
import { Translation } from "@/entities/translations/types";

type Props = {
  namespace: string;
  total: number;
  missing: number;
  locale: string;
  existingKeys: Set<string>;
  onAdd: (translation: Translation) => void;
};

export const KeysTableAddBar = ({
  namespace,
  total,
  missing,
  locale,
  existingKeys,
  onAdd,
}: Props) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const isDuplicate = existingKeys.has(key.trim());
  const isEmpty = !key.trim() || !value.trim();

  const onEnter = (event: React.KeyboardEvent) => event.key === "Enter";

  return (
    <Flex
      align="center"
      gap="2"
      p="3"
      flexShrink="0"
      className="add-bar"
      style={{ borderTop: KEYS_TABLE_BORDER }}
    >
      <TextField.Root
        placeholder="новый.ключ.путь"
        color={isDuplicate ? "red" : undefined}
        className="add-bar-key"
        style={{ ...KEYS_TABLE_MONO }}
        value={key}
        onChange={(event) => setKey(event.target.value)}
        onKeyDown={onEnter}
      />
      <TextField.Root
        placeholder="Значение на основном языке…"
        style={{ flex: 1 }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onEnter}
      />

      <AddTranslation
        disabled={isEmpty || isDuplicate}
        onAddSuccess={onAdd}
        queryItem={{
          key: key.trim(),
          value: value.trim(),
          namespace,
          locale,
        }}
      />
      <Text size="1" color="gray" className="add-bar-stats" style={{ flexShrink: 0 }}>
        {total} {plural(total, "ключ", "ключа", "ключей")} · {locale.toUpperCase()}:{" "}
        {missing ? `ждут ${missing}` : "полный"}
      </Text>
    </Flex>
  );
};
