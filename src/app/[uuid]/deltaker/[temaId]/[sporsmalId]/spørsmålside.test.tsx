import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import CookieHandler from "@/utils/CookieHandler";
import { Tema } from "@/app/_types/tema";
import {
  SpørsmålsoversiktDto,
  SvaralternativDto,
} from "@/app/_types/spørsmålsoversiktDto";
import {
  dummySpørreundersøkelseId,
  dummyFørsteSpørsmål,
  førsteTemaFørsteSpørsmål,
  // @ts-ignore
} from "@/utils/dummyData/dummyInnholdForSpørreundersøkelse";

const testSpørreundersøkelseId: string = dummySpørreundersøkelseId;
const testSpørsmålId: string = førsteTemaFørsteSpørsmål.spørsmålId;
const testTema: Tema = førsteTemaFørsteSpørsmål.temaId;
const testSpørsmålOgSvar: SpørsmålsoversiktDto = dummyFørsteSpørsmål;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: jest.fn(() => null),
  })),
}));

jest.mock("@/app/_api_hooks/deltaker/sendSvar", () => ({
  sendSvar: jest.fn(() => Promise.resolve()),
}));

jest.mock("@/app/_api_hooks/deltaker/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: jest.fn(),
}));

mockCookieHandler();

expect.extend(toHaveNoViolations);

describe("deltaker/Spørsmålsside", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: testSpørsmålOgSvar,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(testSpørsmålOgSvar)),
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
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTema,
        }}
      />,
    );

    expect(
      screen.getByText(testSpørsmålOgSvar.spørsmålTekst),
    ).toBeInTheDocument();

    testSpørsmålOgSvar.svaralternativer.forEach((svar: SvaralternativDto) => {
      expect(screen.getByText(svar.svartekst)).toBeInTheDocument();
    });
  });

  test("klikk på svaralternativ", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: Tema.REDUSERE_SYKEFRAVÆR,
        }}
      />,
    );

    const svar = await screen.findByText(
      testSpørsmålOgSvar.svaralternativer[0].svartekst,
    );
    act(() => svar.click());

    const neste = await screen.findByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      tema: Tema.REDUSERE_SYKEFRAVÆR,
      spørsmålId: testSpørsmålId,
      svarId: testSpørsmålOgSvar.svaralternativer[0].svarId,
    });
  });

  test("Velg og send svar", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: testSpørsmålOgSvar,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(testSpørsmålOgSvar)),
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
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTema,
        }}
      />,
    );

    const svar = screen.getByText(
      testSpørsmålOgSvar.svaralternativer[0].svartekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      spørsmålId: testSpørsmålId,
      tema: testTema,
      svarId: testSpørsmålOgSvar.svaralternativer[0].svarId,
    });
  });

  test("axe UU-test", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: testSpørsmålOgSvar,
      isLoading: false,
      error: null,
      mutate: jest.fn(() => Promise.resolve(testSpørsmålOgSvar)),
      isValidating: false,
    });

    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTema,
        }}
      />,
    );

    await act(async () => {
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });

  test("Bruker valgt svaralternativ fra cookieHandler", async () => {
    const forhåndssvart = testSpørsmålOgSvar.svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => forhåndssvart.svarId);

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          temaId: testTema,
          sporsmalId: testSpørsmålId,
        }}
      />,
    );

    const svar = await screen.findByRole("radio", {
      name: forhåndssvart.svartekst,
    });

    expect(svar).toHaveAttribute("checked");

    const feilSvar = await screen.findByRole("radio", {
      name: testSpørsmålOgSvar.svaralternativer[0].svartekst,
    });

    expect(feilSvar).not.toHaveAttribute("checked");
  });

  test("Viser riktig tekst i svarknapp i forhold til lagret svar", async () => {
    const forhåndssvart = testSpørsmålOgSvar.svaralternativer[1];
    jest
      .spyOn(CookieHandler, "getSvarPåSpørsmål")
      .mockImplementation(() => forhåndssvart.svarId);

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
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
        name: testSpørsmålOgSvar.svaralternativer[0].svartekst,
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
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTema,
        }}
      />,
    );

    await screen
      .findByRole("radio", {
        name: testSpørsmålOgSvar.svaralternativer[0].svartekst,
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
