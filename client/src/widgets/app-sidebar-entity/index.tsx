import { StarFilledIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { NavSection } from "../../components/nav-section";
import { NavRow } from "../../components/naw-row";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type Props = {
  items: { name: string; isDefault?: boolean }[];
  label: string;

  renderDeleteNode: (node: {
    name: string;
    onDeleteEntity: (deletedName: string) => void;
  }) => ReactNode;

  renderAddItemNode: (node: { onAddEntity: (addedName: string) => void }) => ReactNode;
};

export const AppSidebarEntity = ({
  renderAddItemNode,
  renderDeleteNode,
  label,
  items: initItems,
}: Props) => {
  const [items, setItems] = useState<Map<string, (typeof initItems)[number]>>(() => {
    const next = new Map();

    initItems.forEach((item) => {
      next.set(item.name, item);
    });

    return next;
  });

  const onDeleteEntity = (name: string) => {
    setItems((prev) => {
      const next = new Map(prev);

      next.delete(name);

      return next;
    });
  };

  const onAddEntity = (name: string) => {
    if (items.has(name.toLowerCase())) {
      console.log('INSIDE?')
      toast.error("Already exists");
      return;
    }

    setItems((prev) => {
      const next = new Map(prev);

      next.set(name, { name: name.toLowerCase(), isDefault: false });

      return next;
    });
  };

  return (
    <NavSection label={label}>
      {Array.from(items.values()).map((item) => (
        <NavRow
          key={item.name}
          action={
            item.isDefault ? (
              <StarFilledIcon width="14" height="14" style={{ margin: "0 6px", flexShrink: 0 }} />
            ) : (
              renderDeleteNode({
                onDeleteEntity,
                name: item.name,
              })
            )
          }
        >
          <Text truncate>{item.name}</Text>
        </NavRow>
      ))}
      {renderAddItemNode({ onAddEntity })}
    </NavSection>
  );
};
