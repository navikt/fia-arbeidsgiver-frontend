import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import {
  dummySpørreundersøkelseId,
  dummySpørsmålOgSvar,
  førsteTemaFørsteSpørsmål,
  // @ts-ignore
} from "@/utils/dummyData/dummyInnholdForSpørreundersøkelse";
import { axe, toHaveNoViolations } from "jest-axe";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import CookieHandler from "@/utils/CookieHandler";
import { Tema } from "@/app/_types/tema";
import { SvaralternativDto } from "@/app/_types/spørsmålsoversiktDto";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

const dummySpørsmålId = førsteTemaFørsteSpørsmål.spørsmålId;
const dummyTemaId = førsteTemaFørsteSpørsmål.temaId;

jest.mock("@/app/_api_hooks/deltaker/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: jest.fn(),
}));

mockCookieHandler();

jest.mock("@/app/_api_hooks/deltaker/sendSvar", () => ({
  postEnkeltSvar: jest.fn(() => Promise.resolve()),
}));

expect.extend(toHaveNoViolations);
describe("Spørsmålsside", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummySpørsmålOgSvar,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(dummySpørsmålOgSvar)),
      isValidating: false,
    });

    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => undefined);
  });
  test("render fungerer", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          sporsmalId: dummySpørsmålId,
          temaId: dummyTemaId,
        }}
      />,
    );

    const tittel = await screen.findByText(dummySpørsmålOgSvar.spørsmålTekst);

    expect(tittel).toBeInTheDocument();

    dummySpørsmålOgSvar.svaralternativer.forEach((svar: SvaralternativDto) => {
      expect(screen.getByText(svar.svartekst)).toBeInTheDocument();
    });
  });

  test("klikk på svaralternativ", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          sporsmalId: dummySpørsmålId,
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
        }}
      />,
    );

    const svar = await screen.findByText(
      dummySpørsmålOgSvar.svaralternativer[0].tekst,
    );
    act(() => svar.click());

    const neste = await screen.findByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: "a",
      temaId: Tema.REDUSERE_SYKEFRAVÆR,
      spørsmålId: dummySpørsmålOgSvar.id,
      svarId: dummySpørsmålOgSvar.svaralternativer[0].svarId,
    });
  });

  test("Velg og send svar", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummySpørsmålOgSvar,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(dummySpørsmålOgSvar)),
      isValidating: false,
    });
    const pushFunction = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
      push: pushFunction,
      back: jest.fn(),
      prefetch: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    });

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          sporsmalId: dummySpørsmålId,
          temaId: dummyTemaId,
        }}
      />,
    );

    const svar = screen.getByText(
      dummySpørsmålOgSvar.svaralternativer[0].svartekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: dummySpørreundersøkelseId,
      spørsmålId: dummySpørsmålId,
      temaId: dummySpørsmålOgSvar,
      svarId: dummySpørsmålOgSvar.svaralternativer[0].svarId,
    });
  });

  test("axe UU-test", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummySpørsmålOgSvar,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(dummySpørsmålOgSvar)),
      isValidating: false,
    });

    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          sporsmalId: dummySpørsmålId,
          temaId: dummyTemaId,
        }}
      />,
    );

    await act(async () => {
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });

  test("Bruker valgt svaralternativ fra cookieHandler", async () => {
    const forhåndssvart = dummySpørsmålOgSvar.svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => forhåndssvart.id);

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          temaId: dummyTemaId,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const svar = await screen.findByRole("radio", {
      name: forhåndssvart.tekst,
    });

    expect(svar).toHaveAttribute("checked");

    const feilSvar = await screen.findByRole("radio", {
      name: dummySpørsmålOgSvar.svaralternativer[0].tekst,
    });

    expect(feilSvar).not.toHaveAttribute("checked");
  });

  test("Viser riktig tekst i svarknapp i forhold til lagret svar", async () => {
    const forhåndssvart = dummySpørsmålOgSvar.svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => forhåndssvart.id);

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          sporsmalId: dummySpørsmålId,
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
        }}
      />,
    );

    expect(screen.getByRole("button", { name: /Neste/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Endre Svar/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^Svar/i }),
    ).not.toBeInTheDocument();

    await screen
      .findByRole("radio", {
        name: dummySpørsmålOgSvar.svaralternativer[0].tekst,
      })
      .then((radio) => {
        act(() => radio.click());
      });

    expect(
      screen.getByRole("button", { name: /Endre Svar/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Neste/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^Svar/i }),
    ).not.toBeInTheDocument();
  });

  test("Viser riktig tekst i svarknapp uten lagret svar", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          sporsmalId: dummySpørsmålId,
          temaId: dummyTemaId,
        }}
      />,
    );

    await screen
      .findByRole("radio", {
        name: dummySpørsmålOgSvar.svaralternativer[0].tekst,
      })
      .then((radio) => {
        act(() => radio.click());
      });

    expect(screen.getByRole("button", { name: /^Svar/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Neste/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Endre Svar/i }),
    ).not.toBeInTheDocument();
  });
});
