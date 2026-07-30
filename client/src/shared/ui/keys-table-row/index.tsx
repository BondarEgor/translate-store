import { Box, Button, Flex, Grid, Text, Tooltip } from "@radix-ui/themes";
import type { Translation } from "@/api";
import { TranslationKeyName } from "@/shared/ui/translation-key-name";
import { KEYS_TABLE_BORDER, KEYS_TABLE_MONO } from "@/shared/constants/keys-table";
import { DeleteTranslation } from "@/features/delete-translation";
import { EditTranslation } from "@/features/edit-translation";

type Props = {
  row: Translation;
  defaultLocale: string;
  namespace: string;
  onDeleteTranslation: (locale: string, key: string) => void;
  onUpdateTranslation: (updated: Translation) => void;
};

export const KeysTableRow = ({
  namespace,
  row,
  defaultLocale,
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
      style={{ borderBottom: KEYS_TABLE_BORDER }}
    >
      <Tooltip content={hasValue ? "Перевод есть" : "Нет перевода"}>
        <Box mt="2" width="8px" height="8px" />
      </Tooltip>
      <Box style={{ minWidth: 0 }}>
        <TranslationKeyName row={row} />

        <Text
          as="div"
          size="1"
          color="gray"
          truncate
          title={`${row.namespace}.${row.key}`}
          style={KEYS_TABLE_MONO}
        >
          {row.namespace}.{row.key}
        </Text>
      </Box>

      <Box style={{ minWidth: 0 }}>
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
            <Button size="1" variant="outline" color="gray">
              Подтянуть
            </Button>
          </Flex>
        ) : (
          <Tooltip content="Правится через основной язык">
            <Text as="div" size="2" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
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
