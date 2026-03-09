// Type TS séparés


export type GithubUserApi = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GithubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUserApi[];
};

export type UserCardItem = GithubUserApi & {
// localId :  if we want to duplicate a user Github who has a id = 123 for exemple, we need to give it a new id for react when mapping the list of user cards & when selection  
  localId: string; 
  selected: boolean;
};