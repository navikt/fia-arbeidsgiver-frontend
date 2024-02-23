import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("dom test", () => {
  render(<button>My button</button>);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
