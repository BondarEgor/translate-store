import { useState, type ReactNode } from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { toast } from "sonner";
import { NavSection } from "@/shared/ui/nav-section";
import { NavRow } from "@/shared/ui/nav-row";
import css from "./styles.module.css";

type Props = {
  items: { name: string; isDefault?: boolean }[];
  label: string;
  selected: string | null;
  onSelect: (value: string) => void;
  renderDeleteNode: (node: {
    name: string;
    onDeleteEntity: (deletedName: string) => void;
  }) => ReactNode;

  renderAddItemNode: (node: { onAddEntity: (addedName: string) => void }) => ReactNode;
};

export const AppSidebarEntity = ({
  renderAddItemNode,
  renderDeleteNode,
  onSelect,
  selected,
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
          active={item.name === selected}
          onClick={() => onSelect(item.name)}
          key={item.name}
          action={
            item.isDefault ? (
              <StarFilledIcon width="14" height="14" className={css.star} />
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
      {items.size === 0 && (
        <Text size="1" color="gray" className={css.empty}>
          Пусто
        </Text>
      )}
      {renderAddItemNode({ onAddEntity })}
    </NavSection>
  );
};
