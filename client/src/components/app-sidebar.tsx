import { useState } from "react";
import { Box, Flex, ScrollArea, Separator, Text } from "@radix-ui/themes";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { AppSidebarEntity } from "../widgets/app-sidebar-entity";
import { DeleteLanguage } from "@/features/delete-language";
import { DeleteNamespace } from "@/features/delete-namespace";
import { AddNewLanguage } from "@/features/add-language";
import { AddNamespace } from "@/features/add-namespace";
import { Namespaces } from "@/entities/namespaces/types";
import { Locales } from "@/entities/locales/types";

const BORDER = "1px solid var(--gray-a4)";

type Props = {
  locales: Locales;
  namespaces?: Namespaces;
  activeNs: string | null;
  activeLocale: string | null;
  onSelectNs: (ns: string) => void;
  onSelectLocale: (locale: string) => void;
};

export function AppSidebar({
  locales,
  onSelectNs,
  activeNs,
  activeLocale,
  onSelectLocale,
  namespaces,
}: Props) {
  const [removeLocale, setRemoveLocale] = useState<string | null>(null);

  const sortedLocalesByDefault = [...locales].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );

  return (
    <Flex direction="column" className="app-sidebar">
      <Flex
        align="center"
        gap="3"
        px="4"
        height="56px"
        flexShrink="0"
        style={{ borderBottom: BORDER }}
      >
        <Box style={{ minWidth: 0 }}>
          <Text as="div" size="2" weight="bold" truncate>
            Translate{" "}
            <Text as="span" size="2" weight="bold" color="green">
              Store
            </Text>
          </Text>
          <Text as="div" size="1" color="gray">
            all keys, no mess
          </Text>
        </Box>
      </Flex>

      <ScrollArea type="auto" style={{ flexGrow: 1, minHeight: 0 }}>
        <Box py="3">
          <AppSidebarEntity
            renderAddItemNode={({ onAddEntity }) => (
              <AddNamespace
                onSuccess={({ name }) => onSelectNs(name)}
                onAddNamespace={onAddEntity}
              />
            )}
            renderDeleteNode={({ name, onDeleteEntity }) => (
              <DeleteNamespace namespace={name} onDeleteNamespace={onDeleteEntity} />
            )}
            onSelect={onSelectNs}
            label="Таблицы"
            selected={activeNs}
            items={namespaces ?? []}
          />

          <Separator size="4" my="2" />

          <AppSidebarEntity
            renderAddItemNode={({ onAddEntity }) => <AddNewLanguage onAddLocale={onAddEntity} />}
            renderDeleteNode={({ name, onDeleteEntity }) => (
              <DeleteLanguage locale={name} onDeleteLocale={onDeleteEntity} />
            )}
            label="Языки"
            selected={activeLocale}
            onSelect={onSelectLocale}
            items={sortedLocalesByDefault.map((locale) => ({
              name: locale.code,
              isDefault: locale.isDefault,
            }))}
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
