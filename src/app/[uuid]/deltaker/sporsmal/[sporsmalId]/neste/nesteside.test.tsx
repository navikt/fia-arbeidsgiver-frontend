import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Nesteside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

expect.extend(toHaveNoViolations);

describe("deltaker/Nesteside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render fungerer", async () => {
    render(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />);
    const tittel = await screen.findByText(
      "Venter på at verten skal fortsette",
    );
    expect(tittel).toBeInTheDocument();
  });

  it("axe UU-test", async () => {
    const { container } = render(
      <Nesteside params={{ uuid: "a", sporsmalId: "b" }} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
