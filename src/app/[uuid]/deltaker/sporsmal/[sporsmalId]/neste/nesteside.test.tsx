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

  test("render fungerer", async () => {
    render(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />);
    const tittel = await screen.findByText(
      "Venter på at verten skal fortsette",
    );
    expect(tittel).toBeInTheDocument();
  });

  test("render fungerer fra start", async () => {
    render(<Nesteside params={{ uuid: "a", sporsmalId: "START" }} />);
    const tittel = await screen.findByText(
      "Venter på at verten skal starte kartlegging",
    );
    expect(tittel).toBeInTheDocument();
  });

  test("axe UU-test", async () => {
    let results = await axe(
      render(<Nesteside params={{ uuid: "a", sporsmalId: "b" }} />).container,
    );
    expect(results).toHaveNoViolations();

    results = await axe(
      render(<Nesteside params={{ uuid: "START", sporsmalId: "b" }} />)
        .container,
    );
    expect(results).toHaveNoViolations();
  });
});
