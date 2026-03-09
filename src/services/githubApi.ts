// appel api 
// FETCH / JS MODERNES / ABORT SIGNAL / ERROR HANDLING / TYPESCRIPT

import type { GithubSearchResponse } from "../types/github";

export async function searchGithubUsers(
  query: string,
  signal?: AbortSignal
): Promise<GithubSearchResponse> {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    method: "GET",
    signal,
    headers: {
        //réponse au format JSON ( recommanded by github API documentation )
        Accept: "application/vnd.github+json", 
    },
  });

  if (response.status === 403) {
    throw new Error("RATE_LIMIT");
  }

  if (!response.ok) {
    throw new Error("API_ERROR");
  }

  return response.json() as Promise<GithubSearchResponse>;
}