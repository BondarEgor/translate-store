import { Flex, ScrollArea, Separator, Text } from "@radix-ui/themes";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AppSidebarEntity } from "@/widgets/app-sidebar-entity";
import { DeleteLanguage } from "@/features/delete-language";
import { DeleteNamespace } from "@/features/delete-namespace";
import { AddNewLanguage } from "@/features/add-language";
import { AddNamespace } from "@/features/add-namespace";
import { Namespaces } from "@/entities/namespaces/types";
import { Locales } from "@/entities/locales/types";
import css from "./styles.module.css";

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
  const sortedLocalesByDefault = [...locales].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );

  return (
    <Flex direction="column" className={`app-sidebar ${css.sidebar}`}>
      <Flex align="center" gap="3" px="4" flexShrink="0" className={css.header}>
        <Flex className={css.logo}>
          <GlobeIcon width="15" height="15" />
        </Flex>
        <Flex direction="column" className={css.titleBox}>
          <Text size="2" weight="bold" truncate>
            Translate{" "}
            <Text as="span" size="2" weight="bold" color="green">
              Store
            </Text>
          </Text>
          <Text size="1" color="gray">
            all keys, no mess
          </Text>
        </Flex>
      </Flex>

      <ScrollArea type="auto" className={css.body}>
        <Flex direction="column" py="3">
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
        </Flex>
      </ScrollArea>
    </Flex>
  );
}
