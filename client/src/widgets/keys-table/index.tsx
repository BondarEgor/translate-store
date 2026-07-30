import { useState } from "react";
import { Box, Flex, ScrollArea, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Translation } from "@/api";
import { KeysTableRow } from "@/shared/ui/keys-table-row";
import { EmptyState } from "@/shared/ui/empty-state";
import { KEYS_TABLE_BORDER } from "@/shared/constants/keys-table";
import { KeysTableAddBar } from "@/widgets/keys-table-add-bar";
import { Locales } from "@/entities/locales/types";
import { Translations } from "@/entities/translations/types";

type Props = {
  translations?: Translations;
  activeNamespace: string | null;
  activeLocale: string;
  locales: Locales;
};

const createTranslationKey = (key: string, locale: string) => `${locale}_${key}`;

const toTranslationsMap = (list?: Translations) => {
  const next = new Map<string, Translation>();

  list?.forEach((translation) => {
    next.set(createTranslationKey(translation.key, translation.locale), translation);
  });

  return next;
};

export const KeysTable = ({
  translations: initTranslations,
  activeNamespace,
  activeLocale,
  locales,
}: Props) => {
  const [translations, setTranslations] = useState(() => toTranslationsMap(initTranslations));
  const [prevInitTranslations, setPrevInitTranslations] = useState(initTranslations);

  if (initTranslations !== prevInitTranslations) {
    setPrevInitTranslations(initTranslations);
    setTranslations(toTranslationsMap(initTranslations));
  }

  const [query, setQuery] = useState("");

  const defaultLocale = locales.find((l) => l.isDefault)?.code ?? activeLocale;

  const onAddKey = (newTranslation: Translation | Translations) => {
    setTranslations((prev) => {
      const next = new Map(prev);

      if (Array.isArray(newTranslation)) {
        newTranslation.forEach((translation) => {
          next.set(createTranslationKey(translation.key, translation.locale), translation);
        });
      } else {
        next.set(createTranslationKey(newTranslation.key, newTranslation.locale), newTranslation);
      }

      return next;
    });
  };

  const onDeleteTranslation = (locale: string, key: string) => {
    setTranslations((prev) => {
      const next = new Map(prev);

      next.delete(createTranslationKey(key, locale));

      return next;
    });
  };

  const onUpdateTranslation = (toUpdate: Translation) => {
    if (!toUpdate.value) return;

    setTranslations((prev) => {
      const next = new Map(prev);
      const key = createTranslationKey(toUpdate.key, toUpdate.locale);
      const toBeUpdated = next.get(key);

      if (!toBeUpdated) {
        return prev;
      }

      next.set(key, {
        ...toBeUpdated,
        value: toUpdate.value,
      });

      return next;
    });
  };

  if (!activeNamespace) {
    return (
      <Flex flexGrow="1" align="center" justify="center" p="8">
        <Text size="2" color="gray" align="center">
          Создайте первую таблицу в списке слева — это секунды две.
        </Text>
      </Flex>
    );
  }

  const translationsForLocale = Array.from(translations.values()).filter(
    ({ locale }) => locale === activeLocale,
  );

  const searchedTranslations = translationsForLocale.filter((translation) => {
    const lowerCasedQuery = query.toLowerCase();

    return (
      translation.value.toLowerCase().includes(lowerCasedQuery) ||
      translation.key.toLowerCase().includes(lowerCasedQuery)
    );
  });

  return (
    <>
      <Flex
        wrap="wrap"
        align="center"
        gap="2"
        px="4"
        py="3"
        flexShrink="0"
        style={{ borderBottom: KEYS_TABLE_BORDER }}
      >
        <Box flexGrow="1" />

        <TextField.Root
          placeholder="Фильтр по ключу или значению"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{ width: 260 }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {searchedTranslations.length > 0 ? (
        <ScrollArea type="auto" style={{ flexGrow: 1, minHeight: 0 }}>
          {searchedTranslations.map((translation) => (
            <KeysTableRow
              namespace={activeNamespace}
              onUpdateTranslation={onUpdateTranslation}
              key={`${translation.key}-${translation.locale}`}
              row={translation}
              defaultLocale={activeLocale}
              onDeleteTranslation={onDeleteTranslation}
            />
          ))}
        </ScrollArea>
      ) : (
        <EmptyState text="Ключей пока нет" />
      )}

      <KeysTableAddBar
        namespace={activeNamespace}
        total={translations.size}
        missing={0}
        locale={defaultLocale}
        onAdd={onAddKey}
      />
    </>
  );
};
