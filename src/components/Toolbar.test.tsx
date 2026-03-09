import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("displays the selected count", () => {
    render(
      <Toolbar
        allSelected={false}
        selectedCount={2}
        onToggleAll={vi.fn()}
        onDuplicate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText(/2.*elements selected/i)).toBeInTheDocument();
  });

  it("disables actions when nothing is selected", () => {
    render(
      <Toolbar
        allSelected={false}
        selectedCount={0}
        onToggleAll={vi.fn()}
        onDuplicate={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Duplicate selected users" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Delete selected users" }),
    ).toBeDisabled();
  });

  it("calls duplicate and delete actions", async () => {
    const user = userEvent.setup();
    const onDuplicate = vi.fn();
    const onDelete = vi.fn();

    render(
      <Toolbar
        allSelected={false}
        selectedCount={2}
        onToggleAll={vi.fn()}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Duplicate selected users" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Delete selected users" }),
    );

    expect(onDuplicate).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
