import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
// @ts-ignore
import { axe, toHaveNoViolations } from "jest-axe";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";
import { dummySpørreundersøkelse } from "../../../../../../mocks/dummydata";
import { SvaralternativDTO } from "@/app/_types/SpørsmålDTO";
import { svar } from "@/app/_api_hooks/deltaker/svar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

jest.mock("@/app/_api_hooks/deltaker/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: () => ({
    data: dummySpørreundersøkelse[0],
    isLoading: false,
    error: null,
  }),
}));

mockCookieHandler();

jest.mock("@/app/_api_hooks/deltaker/svar", () => ({
  svar: jest.fn(() => Promise.resolve()),
}));

expect.extend(toHaveNoViolations);
describe("Spørsmålsside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("render fungerer", async () => {
    render(<Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />);

    const tittel = await screen.findByText(
      dummySpørreundersøkelse[0].spørsmåltekst,
    );

    expect(tittel).toBeInTheDocument();

    dummySpørreundersøkelse[0].svaralternativer.forEach(
      (svar: SvaralternativDTO) => {
        expect(screen.getByText(svar.svartekst)).toBeInTheDocument();
      },
    );
  });

  it("klikk på svaralternativ", async () => {
    render(<Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />);

    const svartekst = await screen.findByText(
      dummySpørreundersøkelse[0].svaralternativer[0].svartekst,
    );
    act(() => svartekst.click());

    const neste = await screen.findByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(svar).toHaveBeenCalledTimes(1);
  });

  it("klikk på tilbake", async () => {
    const pushFunction = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
      push: pushFunction,
      back: jest.fn(),
      prefetch: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    });
    render(<Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />);
    expect(pushFunction).toHaveBeenCalledTimes(0);

    const tilbake = await screen.findByRole("button", { name: /Tilbake/i });
    await act(async () => tilbake.click());

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith("./b/tilbake");
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
