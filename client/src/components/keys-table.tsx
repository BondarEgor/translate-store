import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  ScrollArea,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  Pencil2Icon,
  PlusIcon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import type {
  AddKeyPayload,
  ApiResult,
  DeleteKeyPayload,
  RenameKeyPayload,
  TranslationRow,
  UpdateKeyPayload,
} from "@/api";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { plural } from "@/lib/plural";
import { noop } from "@tanstack/react-query";

const PAGE = 100;
const BORDER = "1px solid var(--gray-a4)";
const MONO = { fontFamily: "monospace" } as const;

interface KeysTableProps {
  data: {
    key: string;
    locale: string;
    namespace: string;
    value: string;
  }[];
  ns: string | null;
  onAddKey: (payload: AddKeyPayload) => Promise<ApiResult>;
  onUpdateKey: (payload: UpdateKeyPayload) => Promise<ApiResult>;
  onDeleteKey: (payload: DeleteKeyPayload) => Promise<ApiResult>;
  onRenameKey: (payload: RenameKeyPayload) => Promise<ApiResult>;
  onSync: () => Promise<ApiResult>;
}

/** Рабочий стол таблицы: ключи выбранного неймспейса в одном языке, инлайн-редактирование. */
export function KeysTable({
  data,
  ns,
  onAddKey,
  onUpdateKey,
  onDeleteKey,
  onRenameKey,
  onSync,
}: KeysTableProps) {
  const [selectedLocale, setSelectedLocale] = useState("en");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [syncBusy, setSyncBusy] = useState(false);

  const locales = useMemo(() => ["en"], []);

  const nsRows = [];

  if (!ns) {
    return (
      <Flex flexGrow="1" align="center" justify="center" p="8">
        <Text size="2" color="gray" align="center">
          Создайте первую таблицу в списке слева — это секунды две.
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex
        wrap="wrap"
        align="center"
        gap="2"
        px="4"
        py="3"
        flexShrink="0"
        style={{ borderBottom: BORDER }}
      >
        <Flex gap="1">
          {locales.map((lc) => (
            <Button
              key={lc}
              size="1"
              variant={lc === selectedLocale ? "solid" : "soft"}
              color="gray"
              highContrast={lc === selectedLocale}
              onClick={() => setSelectedLocale(lc)}
              style={{ textTransform: "uppercase", ...MONO }}
            >
              {lc}
            </Button>
          ))}
        </Flex>
        <Button
          size="1"
          variant="soft"
          color="gray"
          loading={syncBusy}
          onClick={noop}
        >
          <ReloadIcon />
          Разослать недостающие
        </Button>
        <Box flexGrow="1" />
        <TextField.Root
          placeholder="Фильтр по ключу или тексту…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: 260 }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <ScrollArea type="auto" style={{ flexGrow: 1, minHeight: 0 }}>
        {data.map((row) => (
          <Row
            key={row.key}
            row={{ key: row.key, values: { a: "" }, missing: ["123"],ns:'test' }}
            locale={selectedLocale}
            defaultLocale={'en'}
            editable={false}
            onUpdate={onUpdateKey}
            onDelete={onDeleteKey}
            onRename={onRenameKey}
            onSync={noop}
          />
        ))}
      </ScrollArea>

      <AddBar
        ns={ns}
        total={nsRows.length}
        missing={4}
        locale={selectedLocale}
        onAdd={onAddKey}
      />
    </>
  );
}

interface RowProps {
  row: TranslationRow;
  locale: string;
  defaultLocale: string;
  editable: boolean;
  onUpdate: (payload: UpdateKeyPayload) => Promise<unknown>;
  onDelete: (payload: DeleteKeyPayload) => Promise<unknown>;
  onRename: (payload: RenameKeyPayload) => Promise<unknown>;
  onSync: () => Promise<void>;
}

/** Строка ключа: статус-точка, имя (редактируемое), значение в выбранном языке, удаление. */
function Row({
  row,
  locale,
  defaultLocale,
  editable,
  onUpdate,
  onDelete,
  onRename,
  onSync,
}: RowProps) {
  const [confirm, setConfirm] = useState(false);
  const [pulling, setPulling] = useState(false);
  const allGood = row.missing.length === 0;
  const missing = row.missing.includes(locale);
  const value = row.values[locale];

  return (
    <Grid
      columns="auto minmax(0,1fr) minmax(0,1.6fr) auto"
      gap="3"
      px="4"
      py="3"
      style={{ borderBottom: BORDER }}
    >
      <Tooltip
        content={
          allGood
            ? "Переведено на все языки"
            : `Ждут: ${row.missing.join(", ")}`
        }
      >
        <Box
          mt="2"
          width="8px"
          height="8px"
          style={{
            borderRadius: "50%",
            background: allGood ? "var(--text)" : "transparent",
            boxShadow: allGood ? "none" : "inset 0 0 0 1px var(--gray-a8)",
          }}
        />
      </Tooltip>
      <Box style={{ minWidth: 0 }}>
        <KeyName row={row} onRename={onRename} />
        <Text
          as="div"
          size="1"
          color="gray"
          truncate
          title={`${row.ns}.${row.key}`}
          style={MONO}
        >
          {row.ns}.{row.key}
        </Text>
      </Box>
      <Box style={{ minWidth: 0 }}>
        {editable ? (
          <ValueCell
            value={row.values[defaultLocale]}
            onSave={(v) => onUpdate({ ns: row.ns, key: row.key, value: v })}
          />
        ) : missing ? (
          <Flex align="center" gap="2">
            <Text size="2" color="gray">
              Нет перевода
            </Text>
            <Button
              size="1"
              variant="outline"
              color="gray"
              loading={pulling}
              onClick={() => {
                setPulling(true);
                void onSync().finally(() => setPulling(false));
              }}
            >
              Подтянуть
            </Button>
          </Flex>
        ) : (
          <Tooltip content="Правится через основной язык">
            <Text
              as="div"
              size="2"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {value}
            </Text>
          </Tooltip>
        )}
      </Box>
      <Flex align="start" mt="1">
        <Tooltip content="Удалить ключ">
          <IconButton
            size="1"
            variant="ghost"
            color="gray"
            aria-label={`Удалить ключ ${row.key}`}
            onClick={() => setConfirm(true)}
          >
            <TrashIcon />
          </IconButton>
        </Tooltip>
      </Flex>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title={`Удалить ключ ${row.key}?`}
        description="Ключ исчезнет из всех языков сразу."
        onConfirm={() => void onDelete({ ns: row.ns, key: row.key })}
      />
    </Grid>
  );
}

/** Имя ключа: клик → поле, Enter/blur — переименовать во всех языках, Esc — отмена. */
function KeyName({
  row,
  onRename,
}: {
  row: TranslationRow;
  onRename: (p: RenameKeyPayload) => Promise<unknown>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(row.key);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!editing) setDraft(row.key);
  }, [row.key, editing]);

  const save = async () => {
    setEditing(false);
    const newKey = draft.trim();
    if (!newKey || newKey === row.key) return;
    setBusy(true);
    await onRename({ ns: row.ns, key: row.key, newKey });
    setBusy(false);
  };

  if (!editing) {
    return (
      <Tooltip content="Клик — переименовать ключ">
        <Text
          as="div"
          size="2"
          weight="medium"
          truncate
          style={{ ...MONO, cursor: "pointer", opacity: busy ? 0.5 : 1 }}
          onClick={() => {
            setDraft(row.key);
            setEditing(true);
          }}
        >
          {row.key.split(".").pop()}
        </Text>
      </Tooltip>
    );
  }

  return (
    <TextField.Root
      size="1"
      autoFocus
      value={draft}
      style={MONO}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => void save()}
      onKeyDown={(e) => {
        if (e.key === "Enter") void save();
        if (e.key === "Escape") {
          setDraft(row.key);
          setEditing(false);
        }
      }}
    />
  );
}

/** Значение ключа: клик по тексту → редактор, Enter/blur — сохранить, Esc — отмена. */
function ValueCell({
  value,
  onSave,
}: {
  value: string | undefined;
  onSave: (v: string) => Promise<unknown>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) setDraft(value ?? "");
  }, [value, editing]);

  const save = async () => {
    setEditing(false);
    if (draft === (value ?? "")) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
  };

  if (!editing) {
    return (
      <Flex
        gap="2"
        align="start"
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
            opacity: saving ? 0.5 : 1,
          }}
        >
          {value || "Пусто — клик, чтобы заполнить"}
        </Text>
        <Pencil2Icon style={{ marginTop: 4, flexShrink: 0, opacity: 0.4 }} />
      </Flex>
    );
  }

  return (
    <TextArea
      autoFocus
      rows={Math.min(5, Math.max(2, draft.split("\n").length))}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => void save()}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          void save();
        }
        if (e.key === "Escape") {
          setDraft(value ?? "");
          setEditing(false);
        }
      }}
    />
  );
}

/** Нижняя панель: новый ключ (путь + значение на основном языке) разлетается по всем языкам. */
function AddBar({
  ns,
  total,
  missing,
  locale,
  onAdd,
}: {
  ns: string;
  total: number;
  missing: number;
  locale: string;
  onAdd: (p: AddKeyPayload) => Promise<{ status: string }>;
}) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setKey("");
    setValue("");
  }, [ns]);

  const submit = async () => {
    if (busy || !key.trim() || !value.trim()) return;
    setBusy(true);
    const r = await onAdd({ ns, key: key.trim(), value, translate: true });
    setBusy(false);
    if (r.status === "added") {
      setKey("");
      setValue("");
    }
  };

  const onEnter = (e: React.KeyboardEvent) =>
    e.key === "Enter" && void submit();

  return (
    <Flex
      align="center"
      gap="2"
      p="3"
      flexShrink="0"
      style={{ borderTop: BORDER }}
    >
      <TextField.Root
        placeholder="новый.ключ.путь"
        style={{ width: 224, flexShrink: 0, ...MONO }}
        value={key}
        onChange={(e) => setKey(e.target.value)}
        onKeyDown={onEnter}
      />
      <TextField.Root
        placeholder="Значение на основном языке…"
        style={{ flex: 1 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onEnter}
      />
      <Button
        highContrast
        loading={busy}
        disabled={!key.trim() || !value.trim()}
        onClick={() => void submit()}
      >
        <PlusIcon />
        Добавить ключ
      </Button>
      <Text size="1" color="gray" style={{ flexShrink: 0 }}>
        {total} {plural(total, "ключ", "ключа", "ключей")} ·{" "}
        {locale.toUpperCase()}: {missing ? `ждут ${missing}` : "полный"}
      </Text>
    </Flex>
  );
}
