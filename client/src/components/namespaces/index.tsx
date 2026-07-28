import { Pencil2Icon, TableIcon, PlusIcon } from "@radix-ui/react-icons";
import { Tooltip, IconButton, Text } from "@radix-ui/themes";
import { NavSection } from "../nav-section";
import { NavRow } from "../naw-row";

type Props = {
  namespaces: {
    name: string;
  }[];
};
export const Namespaces = ({ namespaces }: Props) => {
  return (
    <NavSection label="Таблицы">
      {namespaces?.map((n) => (
        <NavRow
          key={n.name}
          action={
            <Tooltip content="Настройки таблицы">
              <IconButton
                size="1"
                variant="ghost"
                color="gray"
                aria-label="Настройки таблицы"
                onClick={(e) => {}}
              >
                <Pencil2Icon />
              </IconButton>
            </Tooltip>
          }
        >
          <TableIcon />
          <Text truncate>{n.name}</Text>
        </NavRow>
      ))}

      {namespaces?.length === 0 && (
        <Text size="1" color="gray" style={{ padding: "0 8px" }}>
          Пока нет таблиц
        </Text>
      )}

      <NavRow>
        <PlusIcon />
        <Text color="gray">Новая таблица</Text>
      </NavRow>
    </NavSection>
  );
};
