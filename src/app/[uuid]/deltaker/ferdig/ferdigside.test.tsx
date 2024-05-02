import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Ferdigside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import CookieHandler from "@/utils/CookieHandler";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";

mockCookieHandler();

expect.extend(toHaveNoViolations);
describe("Ferdigside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(CookieHandler, "setHarSvartAlleSpørsmål");
  });
  test("rett innhold blir tegnet opp", async () => {
    render(<Ferdigside />);
    const tittel = await screen.findByText("Takk for din deltakelse 🎉");
    expect(tittel).toBeInTheDocument();
  });

  test("axe UU-test", async () => {
    const { container } = render(<Ferdigside />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("setter harSvartPåAlleSpørsmål når en lander på siden", () => {
    const harSvartAlleSpørsmål = jest.spyOn(
      CookieHandler,
      "setHarSvartAlleSpørsmål",
    );
    expect(harSvartAlleSpørsmål).toHaveBeenCalledTimes(0);
    render(<Ferdigside />);
    expect(harSvartAlleSpørsmål).toHaveBeenCalledTimes(1);
  });
});
