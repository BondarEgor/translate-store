import { Box, Flex, Grid, Text, Tooltip } from "@radix-ui/themes";
import type { Translation } from "@/entities/translations/types";
import { TranslationKeyName } from "@/shared/ui/translation-key-name";
import { DeleteTranslation } from "@/features/delete-translation";
import { EditTranslation } from "@/features/edit-translation";
import { PullTranslation } from "@/features/pull-translation";
import css from "./styles.module.css";

type Props = {
  row: Translation;
  defaultLocale: string;
  namespace: string;
  pullValue?: string;
  onDeleteTranslation: (locale: string, key: string) => void;
  onUpdateTranslation: (updated: Translation) => void;
};

export const KeysTableRow = ({
  namespace,
  row,
  defaultLocale,
  pullValue,
  onUpdateTranslation,
  onDeleteTranslation,
}: Props) => {
  const editable = row.locale === defaultLocale;
  const hasValue = row.value.length > 0;

  return (
    <Grid
      columns="auto minmax(0,1fr) minmax(0,1.6fr) auto"
      gap="3"
      px="4"
      py="3"
      align="center"
      className={css.row}
    >
      <Tooltip content={hasValue ? "Перевод есть" : "Нет перевода"}>
        <Box className={hasValue ? css.dotFilled : css.dot} />
      </Tooltip>
      <Box className={css.cell}>
        <TranslationKeyName row={row} />

        <Text
          as="div"
          size="1"
          color="gray"
          truncate
          title={`${row.namespace}.${row.key}`}
          className={css.mono}
        >
          {row.namespace}.{row.key}
        </Text>
      </Box>

      <Box className={css.cell}>
        {editable ? (
          <EditTranslation
            value={row.value}
            onUpdateTranslation={onUpdateTranslation}
            translateKey={row.key}
            namespace={namespace}
            locale={row.locale}
          />
        ) : !hasValue ? (
          <Flex align="center" gap="2">
            <Text size="2" color="gray">
              Нет перевода
            </Text>
            <PullTranslation
              namespace={namespace}
              sourceLocale={defaultLocale}
              keyName={row.key}
              value={pullValue}
            />
          </Flex>
        ) : (
          <Tooltip content="Правится через основной язык">
            <Text as="div" size="2" className={css.value}>
              {row.value}
            </Text>
          </Tooltip>
        )}
      </Box>
      <DeleteTranslation
        keyName={row.key}
        locale={row.locale}
        onDeleteTranslation={onDeleteTranslation}
      />
    </Grid>
  );
};
