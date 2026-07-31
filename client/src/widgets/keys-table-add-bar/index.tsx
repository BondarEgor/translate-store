import { useState } from "react";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { plural } from "@/shared/lib/plural";
import { AddTranslation } from "@/features/add-translation";
import { Translation, Translations } from "@/entities/translations/types";
import css from "./styles.module.css";

type Props = {
  namespace: string;
  total: number;
  missing: number;
  locale: string;
  existingKeys: Set<string>;
  onAdd: (translation: Translation | Translations) => void;
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
  const [showErrors, setShowErrors] = useState(false);

  const isDuplicate = existingKeys.has(key.trim());
  const keyError = showErrors && (!key.trim() || isDuplicate);
  const valueError = showErrors && !value.trim();

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Flex align="center" gap="2" p="3" flexShrink="0" className={css.bar}>
        <TextField.Root
          placeholder="новый.ключ.путь"
          color={keyError ? "red" : undefined}
          className={`${css.key} ${css.mono}`}
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <TextField.Root
          placeholder="Значение на основном языке…"
          color={valueError ? "red" : undefined}
          className={css.value}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <AddTranslation
          invalid={isDuplicate}
          onInvalid={() => setShowErrors(true)}
          onAddSuccess={(translation) => {
            onAdd(translation);
            setKey("");
            setValue("");
            setShowErrors(false);
          }}
          queryItem={{ key, value, namespace, locale }}
        />
        {showErrors && (keyError || valueError) && (
          <Text size="1" color="red" className={css.error}>
            {isDuplicate && key.trim() ? "Такой ключ уже есть" : "Заполните ключ и значение"}
          </Text>
        )}
        <Text size="1" color="gray" className={css.stats}>
          {total} {plural(total, "ключ", "ключа", "ключей")} · {locale.toUpperCase()}:{" "}
          {missing ? `ждут ${missing}` : "полный"}
        </Text>
      </Flex>
    </form>
  );
};
