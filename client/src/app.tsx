import { useEffect, useState } from "react";
import { Flex, IconButton, Text, Theme } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { noop, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeysTable } from "./components/keys-table";

const BORDER = "1px solid var(--gray-a4)";

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [locales, setLocales] = useState([]);
  const [localesLoad, setLocalesLoad] = useState(false);
  const [namespacesLoad, setNamespacesLoad] = useState(false);
  const [namespaces, setNamespaces] = useState([]);

  const [translationsLoad, setTranslationsLoad] = useState(false);
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    setLocalesLoad(true);
    fetch("http://localhost:3001/api/locales")
      .then((r) => r.json())
      .then(setLocales)
      .finally(() => {
        setLocalesLoad(false);
      });
  }, []);

  useEffect(() => {
    setNamespacesLoad(true);

    fetch("http://localhost:3001/api/namespaces")
      .then((r) => r.json())
      .then(setNamespaces)
      .finally(() => {
        setNamespacesLoad(false);
      });
  }, []);

  useEffect(() => {
    setTranslationsLoad(true);

    fetch("http://localhost:3001/api/translations?locale=en")
      .then((r) => r.json())
      .then(setTranslations)
      .finally(() => {
        setTranslationsLoad(false);
      });
  }, []);

  console.log(translations);

  const isLoading = localesLoad || namespacesLoad || translationsLoad;

  if (isLoading) return null;

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Theme appearance="dark" accentColor="green" grayColor="gray">
        <Flex height="100vh">
          {sidebarOpen && (
            <AppSidebar
              locales={locales}
              namespaces={namespaces}
              state={{
                namespaces,
                stats: {
                  missing: 1,
                  languages: locales.length,
                  tables: 0,
                  keys: 0,
                },
              }}
              selectedNs={""}
              onSelectNs={() => {}}
              actions={[]}
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
                таблицы
              </Text>
              {"test" && (
                <>
                  <Text size="2" color="gray">
                    /
                  </Text>
                  <Text size="2" weight="medium" truncate>
                    {"test"}
                  </Text>
                </>
              )}
            </Flex>
            <KeysTable
              data={translations}
              ns={"test"}
              onAddKey={noop}
              onUpdateKey={noop}
              onDeleteKey={noop}
              onRenameKey={noop}
              onSync={noop}
            />
          </Flex>
        </Flex>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,.12)",
              color: "var(--text)",
            },
          }}
        />
      </Theme>
    </QueryClientProvider>
  );
}
