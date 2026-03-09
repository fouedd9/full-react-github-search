import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders the input with its placeholder", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("Search Github users..."),
    ).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchInput value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText("Search Github users...");
    await user.type(input, "foued");

    expect(onChange).toHaveBeenCalled();
  });
});
