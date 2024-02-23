import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
// @ts-ignore
import { dummySpørreundersøkelse } from "@/utils/dummydata";
import { axe, toHaveNoViolations } from "jest-axe";

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(dummySpørreundersøkelse[0]),
  }),
);
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

jest.mock("@/app/_api_hooks/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: () => ({
    data: dummySpørreundersøkelse[0],
    isLoading: false,
    error: null,
  }),
}));

expect.extend(toHaveNoViolations);
describe("Spørsmålsside", () => {
  it("render fungerer", async () => {
    render(<Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />);

    const tittel = await screen.findByText(dummySpørreundersøkelse[0].spørsmål);

    expect(tittel).toBeInTheDocument();
  });
  it("axe UU-test", async () => {
    const { container } = render(
      <Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />,
    );

    await act(async () => {
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });
});
