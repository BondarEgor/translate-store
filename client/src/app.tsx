import { useState } from "react";
import { Flex, IconButton, Text, Theme } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { useBootstrap } from "./use-bootstrap";
import { MainContent } from "./widgets/main-content";

const BORDER = "1px solid var(--gray-a4)";

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { namespaces = [], onSelectNs, locales = [], activeNs, isAppLoading } = useBootstrap();

  if (isAppLoading) return null;

  return (
    <Theme appearance="dark" accentColor="green" grayColor="gray">
      <Flex height="100vh">
        {sidebarOpen && (
          <AppSidebar
            activeNs={activeNs}
            locales={locales}
            namespaces={namespaces}
            onSelectNs={onSelectNs}
          />
        )}

        <Flex direction="column" flexGrow="1" style={{ minWidth: 0 }}>
          <Flex
            align="center"
            gap="3"
            px="4"
            height="56px"
            flexShrink="0"
            style={{ borderBottom: BORDER }}
          >
            <IconButton
              variant="ghost"
              color="gray"
              aria-label="Скрыть/показать меню"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <HamburgerMenuIcon />
            </IconButton>

            <Text size="2" color="gray">
              {`таблицы / ${activeNs}`}
            </Text>
          </Flex>

          <MainContent activeNamespace={activeNs} locales={locales} />
        </Flex>
      </Flex>

      <Toaster theme="dark" position="top-right" />
    </Theme>
  );
}
