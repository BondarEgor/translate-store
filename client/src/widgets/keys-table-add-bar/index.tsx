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
  onAdd: (translation: Translation) => void;
};

export const KeysTableAddBar = ({ namespace, total, missing, locale, onAdd }: Props) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const onEnter = (event: React.KeyboardEvent) => event.key === "Enter";

  return (
    <Flex align="center" gap="2" p="3" flexShrink="0" style={{ borderTop: KEYS_TABLE_BORDER }}>
      <TextField.Root
        placeholder="новый.ключ.путь"
        style={{ width: 224, flexShrink: 0, ...KEYS_TABLE_MONO }}
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
        disabled={false}
        onAddSuccess={onAdd}
        queryItem={{
          key,
          value,
          namespace,
          locale,
        }}
      />
      <Text size="1" color="gray" style={{ flexShrink: 0 }}>
        {total} {plural(total, "ключ", "ключа", "ключей")} · {locale.toUpperCase()}:{" "}
        {missing ? `ждут ${missing}` : "полный"}
      </Text>
    </Flex>
  );
};
