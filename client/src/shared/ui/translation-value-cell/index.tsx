import { useState } from "react";
import { Flex, Text, TextArea } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";

type Props = {
  value: string | undefined;
  onSave: (value: string) => void;
};

export const TranslationValueCell = ({ value, onSave }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  if (!editing) {
    return (
      <Flex
        gap="2"
        align="center"
        justify={"between"}
        style={{ cursor: "text" }}
        onClick={() => {
          setDraft(value ?? "");
          setEditing(true);
        }}
      >
        <Text
          as="div"
          size="2"
          color={value ? undefined : "gray"}
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {value || "Пусто — клик, чтобы заполнить"}
        </Text>
        <Pencil2Icon />
      </Flex>
    );
  }

  return (
    <div>
      <TextArea
        value={draft}
        onBlur={() => {
          const next = draft.trim();

          if (next && next !== value) onSave(next);

          setEditing(false);
        }}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
      />
    </div>
  );
};
