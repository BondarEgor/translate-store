import { useState } from "react";
import { Box, Flex, ScrollArea, Separator, Text } from "@radix-ui/themes";
import { GlobeIcon } from "@radix-ui/react-icons";
import { type AppState } from "@/api";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { AddNamespaceDialog } from "./add-namespace-dialog";
import { SidebarBottomInfo } from "./sidebar-bottom-info";
import { AppSidebarEntity } from "../widgets/app-sidebar-entity";
import { Namespaces } from "./namespaces";
import { DeleteEntityButton } from "@/shared/ui/delete-sidebar-entity";
import { DeleteLanguage } from "@/features/delete-language";
import { DeleteNamespace } from "@/features/delete-namespace";
import { AddNewLanguage } from "@/features/add-language";
import { AddNamespace } from "@/features/add-namespace";

const BORDER = "1px solid var(--gray-a4)";

type NsDialog = { mode: "add" } | { mode: "edit"; name: string } | null;

interface AppSidebarProps {
  state: AppState;
  selectedNs: string | null;
  locales: { code: string; isDefault: boolean }[];
  namespaces: { name: string }[];
  onSelectNs: (ns: string) => void;
}

/** Единый сайдбар: таблицы и языки — сворачиваемые секции, статистика снизу. */
export function AppSidebar({ locales, state, namespaces }: AppSidebarProps) {
  const [nsDialog, setNsDialog] = useState<NsDialog>(null);
  const [removeLocale, setRemoveLocale] = useState<string | null>(null);
  const s = state.stats;

  return (
    <Flex
      direction="column"
      width="264px"
      flexShrink="0"
      style={{ borderRight: BORDER }}
    >
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
            renderAddItemNode={({ onAddSuccess }) => (
              <AddNamespace onAddSuccess={onAddSuccess} />
            )}
            renderDeleteNode={({ name, onDeleteSuccess }) => (
              <DeleteNamespace
                namespace={name}
                onDeleteSuccess={onDeleteSuccess}
              />
            )}
            label="Таблицы"
            items={namespaces}
          />

          <Separator size="4" my="2" />

          <AppSidebarEntity
            renderAddItemNode={({ onAddSuccess }) => (
              <AddNewLanguage onAddSuccess={onAddSuccess} />
            )}
            renderDeleteNode={({ name, onDeleteSuccess }) => (
              <DeleteLanguage
                language={name}
                onDeleteSuccess={onDeleteSuccess}
              />
            )}
            description="Все существующие ключи сразу появятся в новом языке."
            title="Новый язык"
            primaryBtn="Добавить язык"
            secondaryBtn="Отмена"
            modalLabel="Добавить язык"
            label="Языки"
            items={locales.map((locale) => ({
              name: locale.code,
              isDefault: locale.isDefault,
            }))}
          />
        </Box>
      </ScrollArea>

      <SidebarBottomInfo stats={s} />

      <AddNamespaceDialog
        dialog={nsDialog}
        onClose={() => setNsDialog(null)}
        actions={{}}
      />

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
