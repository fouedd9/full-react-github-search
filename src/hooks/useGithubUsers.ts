// logique métier || hook de recherche !!!

/*
USE CASE : 
- No ENTER press ✅
-recherche instantanée au fur et à mesure de la saisie ✅
- Debounce pour éviter les appels API à chaque frappe 300ms ✅
-annulation de requete précédente a chaque nouvelle recherche ✅ 
- Affichage d'un loader pendant la recherche withour UI
- Gestion des erreurs (ex: limite de requêtes atteinte) API RATE LIMIT CODE 403 ✅
- aucun résultat WITHOUT UI 

*/


import { useEffect, useRef, useState } from "react";
import { searchGithubUsers } from "../services/githubApi";
import type { UserCardItem } from "../types/github";

type Status = "idle" | "loading" | "success" | "error";

function mapUsersWithLocalState(
  users: Omit<UserCardItem, "localId" | "selected">[]
): UserCardItem[] {
  return users.map((user) => ({
    ...user,
    localId: crypto.randomUUID(),
    selected: false,
  }));
}

export function useGithubUsers(query: string) {
  const [users, setUsers] = useState<UserCardItem[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<number | null>(null);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    if (!trimmedQuery) {
      return;
    }

    const controller = new AbortController();

    debounceRef.current = window.setTimeout(async () => {
      try {
        setStatus("loading");
        setError(null);

        const data = await searchGithubUsers(trimmedQuery, controller.signal);

        const mappedUsers = mapUsersWithLocalState(data.items);
        setUsers(mappedUsers);
        setStatus("success");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        if (err instanceof Error && err.message === "RATE_LIMIT") {
          setError("Limite GitHub atteinte. Réessaie plus tard.");
        } else {
          setError("Une erreur est survenue.");
        }

        setUsers([]);
        setStatus("error");
      }
    }, 300); // debounce de 300ms

    return () => {
      controller.abort();

      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [trimmedQuery]);

  return {
    users: trimmedQuery ? users : [],
    setUsers,
    status: trimmedQuery ? status : "idle",
    error: trimmedQuery ? error : null,
  };
}