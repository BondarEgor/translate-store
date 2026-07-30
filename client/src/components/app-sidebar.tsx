import { useState } from "react";
import { Box, Flex, ScrollArea, Separator, Text } from "@radix-ui/themes";
import { GlobeIcon } from "@radix-ui/react-icons";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { AppSidebarEntity } from "../widgets/app-sidebar-entity";
import { DeleteLanguage } from "@/features/delete-language";
import { DeleteNamespace } from "@/features/delete-namespace";
import { AddNewLanguage } from "@/features/add-language";
import { AddNamespace } from "@/features/add-namespace";
import { Namespaces } from "@/entities/namespaces/types";
import { Locales } from "@/entities/locales/types";
import { noop } from "@/shared/lib/noop";

const BORDER = "1px solid var(--gray-a4)";

type Props = {
  locales: Locales;
  namespaces?: Namespaces;
  onSelectNs: (ns: string) => void;
};

export function AppSidebar({ locales, onSelectNs, namespaces }: Props) {
  const [removeLocale, setRemoveLocale] = useState<string | null>(null);

  const sortedLocalesByDefault = locales.sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;

    return 0;
  });

  return (
    <Flex direction="column" width="264px" flexShrink="0" style={{ borderRight: BORDER }}>
      <Flex
        align="center"
        gap="3"
        px="4"
        height="56px"
        flexShrink="0"
        style={{ borderBottom: BORDER }}
      >
        <Flex
          align="center"
          justify="center"
          width="28px"
          height="28px"
          flexShrink="0"
          style={{ background: "var(--text)", borderRadius: "var(--radius-2)" }}
        >
          <GlobeIcon color="var(--background)" />
        </Flex>
        <Box style={{ minWidth: 0 }}>
          <Text as="div" size="2" weight="bold" truncate>
            Хранилище переводов
          </Text>
          <Text as="div" size="1" color="gray">
            админка ключей
          </Text>
        </Box>
      </Flex>

      <ScrollArea type="auto" style={{ flexGrow: 1, minHeight: 0 }}>
        <Box py="3">
          <AppSidebarEntity
            renderAddItemNode={({ onAddEntity }) => <AddNamespace onAddNamespace={onAddEntity} />}
            renderDeleteNode={({ name, onDeleteEntity }) => (
              <DeleteNamespace namespace={name} onDeleteNamespace={onDeleteEntity} />
            )}
            onSelect={onSelectNs}
            label="Таблицы"
            items={namespaces}
          />

          <Separator size="4" my="2" />

          <AppSidebarEntity
            renderAddItemNode={({ onAddEntity }) => <AddNewLanguage onAddLocale={onAddEntity} />}
            renderDeleteNode={({ name, onDeleteEntity }) => (
              <DeleteLanguage locale={name} onDeleteLocale={onDeleteEntity} />
            )}
            label="Языки"
            items={sortedLocalesByDefault.map((locale) => ({
              name: locale.code,
              isDefault: locale.isDefault,
            }))}
            onSelect={noop}
          />
        </Box>
      </ScrollArea>

      {/* <SidebarBottomInfo stats={s} /> */}

      <ConfirmDialog
        open={removeLocale !== null}
        onOpenChange={(o) => !o && setRemoveLocale(null)}
        title={`Удалить язык ${removeLocale}?`}
        description="Язык и все его переводы будут удалены безвозвратно."
        onConfirm={() => {}}
      />
    </Flex>
  );
}
