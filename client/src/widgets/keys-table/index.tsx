import { useState } from "react";
import { Box, Flex, ScrollArea, TextField } from "@radix-ui/themes";
import { FilePlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { KeysTableRow } from "@/shared/ui/keys-table-row";
import { EmptyState } from "@/shared/ui/empty-state";
import { KeysTableAddBar } from "@/widgets/keys-table-add-bar";
import { Locales } from "@/entities/locales/types";
import { Translation, Translations } from "@/entities/translations/types";
import css from "./styles.module.css";

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
      <EmptyState
        text="Таблиц пока нет"
        hint="Создайте первую в списке слева — это секунды две"
        icon={<FilePlusIcon width="20" height="20" />}
      />
    );
  }

  const keys = Array.from(new Set(Array.from(translations.values()).map(({ key }) => key)));

  const translationsForLocale = keys.map((key) => {
    return (
      translations.get(createTranslationKey(key, activeLocale)) ?? {
        key,
        locale: activeLocale,
        namespace: activeNamespace ?? "",
        value: "",
      }
    );
  });

  const searchedTranslations = translationsForLocale.filter((translation) => {
    const lowerCasedQuery = query.toLowerCase();

    return (
      translation.value.toLowerCase().includes(lowerCasedQuery) ||
      translation.key.toLowerCase().includes(lowerCasedQuery)
    );
  });

  const missing = translationsForLocale.filter((translation) => !translation.value).length;

  return (
    <>
      <Flex wrap="wrap" align="center" gap="2" px="4" py="3" flexShrink="0" className={css.toolbar}>
        <Box flexGrow="1" />

        <TextField.Root
          placeholder="Фильтр по ключу или значению"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={css.search}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {searchedTranslations.length > 0 ? (
        <ScrollArea type="auto" className={css.body}>
          {searchedTranslations.map((translation) => (
            <KeysTableRow
              namespace={activeNamespace}
              onUpdateTranslation={onUpdateTranslation}
              key={`${translation.key}-${translation.locale}`}
              row={translation}
              defaultLocale={defaultLocale}
              pullValue={
                translations.get(createTranslationKey(translation.key, defaultLocale))?.value
              }
              onDeleteTranslation={onDeleteTranslation}
            />
          ))}
        </ScrollArea>
      ) : (
        <EmptyState
          text={query ? "Ничего не найдено" : "Ключей пока нет"}
          hint={query ? `По запросу «${query}» пусто` : "Добавьте первый ключ внизу"}
          icon={<MagnifyingGlassIcon width="20" height="20" />}
        />
      )}

      <KeysTableAddBar
        namespace={activeNamespace}
        total={keys.length}
        missing={missing}
        locale={defaultLocale}
        existingKeys={new Set(keys)}
        onAdd={onAddKey}
      />
    </>
  );
};
