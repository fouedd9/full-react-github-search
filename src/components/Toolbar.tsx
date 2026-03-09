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
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <label className="select-all">
          <input type="checkbox" checked={allSelected} onChange={onToggleAll} />
          <span>{selectedCount} elements selected</span>
        </label>
      </div>

      <div className="toolbar-actions">
        <button
          className="icon-button"
          onClick={onDuplicate}
          disabled={selectedCount === 0}
          aria-label="Duplicate selected users"
        >
          📄
        </button>

        <button
          className="icon-button"
          onClick={onDelete}
          disabled={selectedCount === 0}
          aria-label="Delete selected users"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
