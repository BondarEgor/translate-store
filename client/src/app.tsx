import { useState } from "react";
import { Flex, IconButton, Text, Theme } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";
import { AppSidebar } from "@/widgets/app-sidebar";
import { AppSkeleton } from "@/shared/ui/app-skeleton";
import { useBootstrap } from "./use-bootstrap";
import { MainContent } from "./widgets/main-content";
import css from "./app.module.css";

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    namespaces = [],
    onSelectNs,
    locales = [],
    activeNs,
    activeLocale,
    onSelectLocale,
    isAppLoading,
  } = useBootstrap();

  if (isAppLoading) {
    return (
      <Theme appearance="dark" accentColor="green" grayColor="gray">
        <AppSkeleton />
      </Theme>
    );
  }

  return (
    <Theme appearance="dark" accentColor="green" grayColor="gray">
      <Flex className="app-shell">
        {sidebarOpen && (
          <AppSidebar
            activeNs={activeNs}
            activeLocale={activeLocale}
            locales={locales}
            namespaces={namespaces}
            onSelectNs={onSelectNs}
            onSelectLocale={onSelectLocale}
          />
        )}

        <Flex direction="column" flexGrow="1" className={css.main}>
          <Flex align="center" gap="3" px="4" flexShrink="0" className={css.header}>
            <IconButton
              variant="ghost"
              color="gray"
              aria-label="Скрыть/показать меню"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <HamburgerMenuIcon />
            </IconButton>

            <Text size="2" color="gray" truncate>
              {"таблицы"}
              {activeNs && (
                <>
                  {" / "}
                  <Text as="span" size="2" weight="bold" color="green">
                    {activeNs}
                  </Text>
                </>
              )}
              {activeLocale && ` / ${activeLocale}`}
            </Text>
          </Flex>

          <MainContent activeNamespace={activeNs} activeLocale={activeLocale} locales={locales} />
        </Flex>
      </Flex>

      <Toaster theme="dark" position="top-right" />
    </Theme>
  );
}
