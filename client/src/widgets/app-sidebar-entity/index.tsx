import { StarFilledIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { NavSection } from "../../components/nav-section";
import { NavRow } from "../../components/naw-row";
import { ReactNode, useState } from "react";

type Props = {
  items: { name: string; isDefault?: boolean }[];
  label: string;

  renderDeleteNode: (node: {
    name: string;
    onDeleteSuccess: (deletedName: string) => void;
  }) => ReactNode;

  renderAddItemNode: (node: {
    onAddSuccess: (addedName: string) => void;
  }) => ReactNode;
};

export const AppSidebarEntity = ({
  renderAddItemNode,
  renderDeleteNode,
  label,
  items: initItems,
}: Props) => {
  const [items, setItems] = useState(initItems);

  const onDelete = (deleteLocale: string) => {
    setItems((prev) => {
      const next = prev.filter((locale) => locale.name !== deleteLocale);

      return next;
    });
  };

  const onAdd = (locale: string) => {
    setItems((prev) => {
      const next = [...prev];
      next.push({ name: locale, isDefault: false });

      return next;
    });
  };

  return (
    <NavSection label={label}>
      {items.map((item) => (
        <NavRow
          key={item.name}
          action={
            item.isDefault ? (
              <StarFilledIcon
                width="14"
                height="14"
                style={{ margin: "0 6px", flexShrink: 0 }}
              />
            ) : (
              renderDeleteNode({ onDeleteSuccess: onDelete, name: item.name })
            )
          }
        >
          <Text truncate>{item.name}</Text>
        </NavRow>
      ))}
      {renderAddItemNode({ onAddSuccess: onAdd })}
    </NavSection>
  );
};
