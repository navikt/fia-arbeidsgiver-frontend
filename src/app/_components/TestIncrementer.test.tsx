import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, describe } from "bun:test";
import React from "react";
import TestIncrementer from "./TestIncrementer";

describe("TestIncrementer", () => {
  it("should increment the counter when the button is clicked", () => {
    render(<TestIncrementer />);

    expect(screen.getByText(/count: 0/i)).toBeDefined();
    expect(screen.queryByText(/count: 1/i)).toBeNull();

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(incrementButton);

    expect(screen.getByText(/count: 1/i)).toBeDefined();
  });
});
