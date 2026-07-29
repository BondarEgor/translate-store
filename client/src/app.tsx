import { useState } from "react";
import { Flex, IconButton, Text, Theme } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { KeysTable } from "@/widgets/keys-table";
import { useBootstrap } from "./use-bootstrap";
import { RenameKeyPayload, ApiResult } from "./api";

const BORDER = "1px solid var(--gray-a4)";

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { namespaces = [], locales = [], translations = [], isAppLoading } = useBootstrap();

  if (isAppLoading) return null;

  return (
    <Theme appearance="dark" accentColor="green" grayColor="gray">
      <Flex height="100vh">
        {sidebarOpen && (
          <AppSidebar locales={locales} namespaces={namespaces} onSelectNs={() => {}} />
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
              таблицы / test
            </Text>
          </Flex>
          <KeysTable
            locales={locales}
            translations={translations}
            ns={"test"}
            onRenameKey={function (payload: RenameKeyPayload): Promise<ApiResult> {
              throw new Error("Function not implemented.");
            }}
          />
        </Flex>
      </Flex>

      <Toaster theme="dark" position="top-right" />
    </Theme>
  );
}
