import { useState } from "react";
import { Text, TextField, Tooltip } from "@radix-ui/themes";
import type { Translation } from "@/api";
import { KEYS_TABLE_MONO } from "@/shared/constants/keys-table";

type TranslationKeyNameProps = {
  row: Translation;
};

export const TranslationKeyName = ({ row }: TranslationKeyNameProps) => {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <Tooltip content="Клик — переименовать ключ">
        <Text
          as="div"
          size="2"
          weight="medium"
          truncate
          style={{ ...KEYS_TABLE_MONO, cursor: "pointer" }}
          onClick={() => {
            setEditing(true);
          }}
        >
          {row.key.split(".").pop()}
        </Text>
      </Tooltip>
    );
  }

  return <TextField.Root size="1" autoFocus style={KEYS_TABLE_MONO} onBlur={() => {}} />;
};
