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
  });
  test("render fungerer", async () => {
    render(<Ferdigside />);
    const tittel = await screen.findByText("Takk for ditt bidrag!");
    expect(tittel).toBeInTheDocument();
  });

  test("axe UU-test", async () => {
    const { container } = render(<Ferdigside />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("clearer cookies når siden rendres", () => {
    expect(CookieHandler.clear).toHaveBeenCalledTimes(0);
    render(<Ferdigside />);
    expect(CookieHandler.clear).toHaveBeenCalledTimes(1);
  });
});
