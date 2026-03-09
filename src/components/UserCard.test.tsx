import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserCard } from "./UserCard";
import type { UserCardItem } from "../types/github";

const userItem: UserCardItem = {
  id: 1,
  login: "foued",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/foued",
  localId: "local-1",
  selected: false,
};

describe("UserCard", () => {
  it("renders the user information", () => {
    render(<UserCard user={userItem} editMode={false} onToggle={vi.fn()} />);

    expect(screen.getByText("foued")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "foued" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View profile" })).toHaveAttribute(
      "href",
      "https://github.com/foued",
    );
  });

  it("shows checkbox only in edit mode", () => {
    const { rerender } = render(
      <UserCard user={userItem} editMode={false} onToggle={vi.fn()} />,
    );

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    rerender(<UserCard user={userItem} editMode={true} onToggle={vi.fn()} />);

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<UserCard user={userItem} editMode={true} onToggle={onToggle} />);

    await user.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith("local-1");
  });
});
