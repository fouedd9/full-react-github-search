import { useMemo, useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { SearchInput } from "./components/SearchInput";
import { Toolbar } from "./components/Toolbar";
import { UserCard } from "./components/UserCard";
import { useGithubUsers } from "./hooks/useGithubUsers";
import "./styles.css";

function App() {
  const [query, setQuery] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { users, setUsers, status, error } = useGithubUsers(query);

  const selectedCount = useMemo(() => {
    return users.filter((user) => user.selected).length;
  }, [users]);

  const allSelected = users.length > 0 && selectedCount === users.length;

  const handleToggleUser = (localId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.localId === localId ? { ...user, selected: !user.selected } : user,
      ),
    );
  };

  const handleToggleAll = () => {
    const nextValue = !allSelected;

    setUsers((prev) =>
      prev.map((user) => ({
        ...user,
        selected: nextValue,
      })),
    );
  };

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((user) => !user.selected));
  };

  const handleDuplicateSelected = () => {
    setUsers((prev) => {
      const duplicated = prev
        .filter((user) => user.selected)
        .map((user) => ({
          ...user,
          localId: crypto.randomUUID(),
          selected: false,
        }));

      return [...prev, ...duplicated];
    });
  };

  return (
    <>
      <header className="app-header">
        <h1>Github Search</h1>
      </header>
      <main className="page">
        <section className="container">
          <div className="header">
            <label className="edit-mode">
              <input
                type="checkbox"
                checked={editMode}
                onChange={() => setEditMode((prev) => !prev)}
              />
              Edit mode
            </label>
          </div>

          <SearchInput value={query} onChange={setQuery} />

          {editMode && users.length > 0 && (
            <Toolbar
              allSelected={allSelected}
              selectedCount={selectedCount}
              onToggleAll={handleToggleAll}
              onDuplicate={handleDuplicateSelected}
              onDelete={handleDeleteSelected}
            />
          )}

          {status === "loading" && <EmptyState message="Loading..." />}
          {status === "idle" && (
            <EmptyState message="Start typing to search Github users" />
          )}
          {error && <EmptyState message={error} />}
          {status === "success" && users.length === 0 && (
            <EmptyState message="No results found." />
          )}
          <div className="results">
            <div className="grid">
              {users.map((user) => (
                <UserCard
                  key={user.localId}
                  user={user}
                  editMode={editMode}
                  onToggle={handleToggleUser}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
