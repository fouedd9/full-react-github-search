import type { UserCardItem } from "../types/github";

type UserCardProps = {
  user: UserCardItem;
  editMode: boolean;
  onToggle: (localId: string) => void;
};

export function UserCard({ user, editMode, onToggle }: UserCardProps) {
  return (
    <article className="card">
      {editMode && (
        <input
          className="card-checkbox"
          type="checkbox"
          checked={user.selected}
          onChange={() => onToggle(user.localId)}
        />
      )}

      <img src={user.avatar_url} alt={user.login} className="avatar" />

      <div className="card-content">
        <p className="user-id">ID: {user.id}</p>
        <h2>{user.login}</h2>

        <a href={user.html_url} target="_blank" rel="noreferrer">
          View profile
        </a>
      </div>
    </article>
  );
}
