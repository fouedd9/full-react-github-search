import { useState } from "react";
import { SearchInput } from "./components/SearchInput";
import { Toolbar } from "./components/Toolbar";
import { UserCard } from "./components/UserCard";
import { useGithubUsers } from "./hooks/useGithubUsers";
import "./styles.css";
import ShowData from "./components/ShowData";
import { useUserSelection } from "./hooks/useUserSelection";

function App() {
  const [query, setQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { users, setUsers, status, error } = useGithubUsers(query);
  const {
    selectedCount,
    allSelectedCard,
    handleToggleUser,
    handleToggleAll,
    handleDeleteSelected,
    handleDuplicateSelected,
  } = useUserSelection({
    users,
    setUsers,
  });

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
              allSelected={allSelectedCard}
              selectedCount={selectedCount}
              onToggleAll={handleToggleAll}
              onDuplicate={handleDuplicateSelected}
              onDelete={handleDeleteSelected}
            />
          )}

          <ShowData status={status} error={error} userCount={users.length} />

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
