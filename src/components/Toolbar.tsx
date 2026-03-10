import { useEffect, useRef } from "react";

type ToolbarProps = {
  allSelected: boolean;
  selectedCount: number;
  onToggleAll: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export function Toolbar({
  allSelected,
  selectedCount,
  onToggleAll,
  onDuplicate,
  onDelete,
}: ToolbarProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!checkboxRef.current) return;

    checkboxRef.current.indeterminate = selectedCount > 0 && !allSelected;
  }, [selectedCount, allSelected]);

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <label className="select-all">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            aria-checked={
              selectedCount > 0 && !allSelected ? "mixed" : allSelected
            }
          />
          <span>
            {selectedCount} {selectedCount === 1 ? "element" : "elements"}{" "}
            selected
          </span>
        </label>
      </div>

      <div className="toolbar-actions">
        <button
          className="icon-button"
          onClick={onDuplicate}
          disabled={selectedCount === 0}
          aria-label="Duplicate selected users"
          title="Duplicate"
        >
          📄
        </button>

        <button
          className="icon-button"
          onClick={onDelete}
          disabled={selectedCount === 0}
          aria-label="Delete selected users"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
