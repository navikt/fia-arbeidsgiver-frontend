import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Ferdigside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Ferdigside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render fungerer", async () => {
    render(<Ferdigside />);
    const tittel = await screen.findByText(
      "Bra jobbet! Da har alle svar blitt logget og sendt til Fia. Rådgiveren sier litt om prosessen videre.",
    );
    expect(tittel).toBeInTheDocument();
  });

  it("axe UU-test", async () => {
    const { container } = render(<Ferdigside />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
