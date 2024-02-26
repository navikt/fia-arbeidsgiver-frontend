import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
// @ts-ignore
import { dummySpørreundersøkelse } from "@/utils/dummydata";
import { axe, toHaveNoViolations } from "jest-axe";
import { svaralternativDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

jest.mock("@/app/_api_hooks/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: () => ({
    data: dummySpørreundersøkelse[0],
    isLoading: false,
    error: null,
  }),
}));

mockCookieHandler();

jest.mock("@/app/_api_hooks/svar", () => ({
  postEnkeltSvar: jest.fn(() => Promise.resolve()),
}));

expect.extend(toHaveNoViolations);
describe("Spørsmålsside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("render fungerer", async () => {
    render(<Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />);

    const tittel = await screen.findByText(dummySpørreundersøkelse[0].spørsmål);

    expect(tittel).toBeInTheDocument();

    dummySpørreundersøkelse[0].svaralternativer.forEach(
      (svar: svaralternativDTO) => {
        expect(screen.getByText(svar.tekst)).toBeInTheDocument();
      },
    );
  });

  it("klikk på svaralternativ", async () => {
    render(<Spørsmålsside params={{ uuid: "a", sporsmalId: "b" }} />);

    const svar = await screen.findByText(
      dummySpørreundersøkelse[0].svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = await screen.findByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(postEnkeltSvar).toHaveBeenCalledTimes(1);
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
