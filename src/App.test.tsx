import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import App from "./App";
import type { UserCardItem } from "./types/github";

const mockSetUsers = vi.fn();

vi.mock("./hooks/useGithubUsers", () => ({
  useGithubUsers: vi.fn(),
}));

import { useGithubUsers } from "./hooks/useGithubUsers";

const mockedUseGithubUsers = vi.mocked(useGithubUsers);

const fakeUsers: UserCardItem[] = [
  {
    id: 1,
    login: "foued",
    avatar_url: "https://example.com/avatar-1.png",
    html_url: "https://github.com/foued",
    localId: "local-1",
    selected: false,
  },
  {
    id: 2,
    login: "nesrine",
    avatar_url: "https://example.com/avatar-2.png",
    html_url: "https://github.com/nesrine",
    localId: "local-2",
    selected: true,
  },
];

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the initial empty state", () => {
    mockedUseGithubUsers.mockReturnValue({
      users: [],
      setUsers: mockSetUsers,
      status: "idle",
      error: null,
    });

    render(<App />);

    expect(
      screen.getByText("Start typing to search Github users"),
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockedUseGithubUsers.mockReturnValue({
      users: [],
      setUsers: mockSetUsers,
      status: "loading",
      error: null,
    });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockedUseGithubUsers.mockReturnValue({
      users: [],
      setUsers: mockSetUsers,
      status: "error",
      error: "Limite GitHub atteinte. Réessaie plus tard.",
    });

    render(<App />);

    expect(
      screen.getByText("Limite GitHub atteinte. Réessaie plus tard."),
    ).toBeInTheDocument();
  });

  it("shows no results state", () => {
    mockedUseGithubUsers.mockReturnValue({
      users: [],
      setUsers: mockSetUsers,
      status: "success",
      error: null,
    });

    render(<App />);

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("renders users returned by the hook", () => {
    mockedUseGithubUsers.mockReturnValue({
      users: fakeUsers,
      setUsers: mockSetUsers,
      status: "success",
      error: null,
    });

    render(<App />);

    expect(screen.getByText("foued")).toBeInTheDocument();
    expect(screen.getByText("nesrine")).toBeInTheDocument();
  });

  it("shows toolbar only when edit mode is enabled", async () => {
    const user = userEvent.setup();

    mockedUseGithubUsers.mockReturnValue({
      users: fakeUsers,
      setUsers: mockSetUsers,
      status: "success",
      error: null,
    });

    render(<App />);

    expect(screen.queryByText(/Select all/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: /edit mode/i }));

    expect(screen.getByText(/1.*element selected/i)).toBeInTheDocument();
  });
});
