import { EmptyState } from "./EmptyState";

type ShowDataProps = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  userCount: number;
};

export default function ShowData({ status, error, userCount }: ShowDataProps) {
  if (error) return <EmptyState message={error} />;

  switch (status) {
    case "loading":
      return <EmptyState message="Loading..." />;

    case "idle":
      return <EmptyState message="Start typing to search Github users" />;

    case "success":
      if (userCount === 0) {
        return <EmptyState message="No results found." />;
      }
      return null;

    default:
      return null;
  }
}
