import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserCardItem } from "../types/github";

type UseUserSelectionParams = {
  users: UserCardItem[];
  setUsers: Dispatch<SetStateAction<UserCardItem[]>>;
};

export function useUserSelection({
  users,
  setUsers,
}: UseUserSelectionParams) {
  const selectedCount = useMemo(() => {
    return users.filter((user) => user.selected).length;
  }, [users]);

  const allSelectedCard = users.length > 0 && selectedCount === users.length;

  const handleToggleUser = (localId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.localId === localId ? { ...user, selected: !user.selected } : user,
      ),
    );
  };

  const handleToggleAll = () => {
    const nextValue = !allSelectedCard;

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

  return {
    selectedCount,
    allSelectedCard,
    handleToggleUser,
    handleToggleAll,
    handleDeleteSelected,
    handleDuplicateSelected,
  };
}