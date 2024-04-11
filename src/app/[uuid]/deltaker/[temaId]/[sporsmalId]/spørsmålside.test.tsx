import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { useRouter } from "next/navigation";
import mockCookieHandler from "@/utils/jest-mocks/CookieHandler";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import CookieHandler from "@/utils/CookieHandler";
import {
  SpørsmålsoversiktDto,
  SvaralternativDto,
} from "@/app/_types/spørsmålsoversiktDto";
import {
  dummySpørreundersøkelseId,
  dummyFørsteSpørsmål,
  dummyTredjeSpørsmål,
  dummyFjerdeSpørsmål,
  førsteTemaFørsteSpørsmål,
  // @ts-ignore
} from "@/utils/dummyData/dummyInnholdForSpørreundersøkelse";

const testSpørreundersøkelseId: string = dummySpørreundersøkelseId;
const testSpørsmålId: string = førsteTemaFørsteSpørsmål.spørsmålId;
const testTemaId: number = førsteTemaFørsteSpørsmål.temaId;
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

  test("rett innhold blir tegnet opp", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
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
          temaId: testTemaId,
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
      temaId: testTemaId,
      spørsmålId: testSpørsmålId,
      svarIder: [testSpørsmålOgSvar.svaralternativer[0].svarId],
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
          temaId: testTemaId,
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
      temaId: testTemaId,
      svarIder: [testSpørsmålOgSvar.svaralternativer[0].svarId],
    });

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(
      `../${testSpørsmålOgSvar.nesteSpørsmål?.temaId}/${testSpørsmålOgSvar.nesteSpørsmål?.spørsmålId}`,
    );
  });

  test("Siste spørsmål i tema redirecter til første i neste tema", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyTredjeSpørsmål,
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
          temaId: testTemaId,
        }}
      />,
    );

    const svar = screen.getByText(
      dummyTredjeSpørsmål.svaralternativer[0].svartekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      spørsmålId: testSpørsmålId,
      temaId: testTemaId,
      svarIder: [dummyTredjeSpørsmål.svaralternativer[0].svarId],
    });

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(
      `../${dummyTredjeSpørsmål.nesteSpørsmål?.temaId}/${dummyTredjeSpørsmål.nesteSpørsmål?.spørsmålId}`,
    );
  });

  test("Siste spørsmål i siste tema redirecter til ferdigside", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyFjerdeSpørsmål,
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
          temaId: testTemaId,
        }}
      />,
    );

    const svar = screen.getByText(
      dummyFjerdeSpørsmål.svaralternativer[0].svartekst,
    );
    act(() => svar.click());

    const neste = screen.getByRole("button", { name: /Svar/i });
    await act(async () => neste.click());

    expect(sendSvar).toHaveBeenCalledTimes(1);
    expect(sendSvar).toHaveBeenCalledWith({
      spørreundersøkelseId: testSpørreundersøkelseId,
      spørsmålId: testSpørsmålId,
      temaId: testTemaId,
      svarIder: [dummyFjerdeSpørsmål.svaralternativer[0].svarId],
    });

    expect(pushFunction).toHaveBeenCalledTimes(1);
    expect(pushFunction).toHaveBeenCalledWith(`../ferdig`);
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
          temaId: testTemaId,
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
      .mockImplementation(() => [forhåndssvart.svarId]);

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          temaId: testTemaId,
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
      .mockImplementation(() => [forhåndssvart.svarId]);

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: 2,
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
          temaId: testTemaId,
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

  test("Viser feilmelding dersom vi har error og loading", () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: new Error("Noe gikk galt."),
      mutate: jest.fn(() => Promise.resolve(testSpørsmålOgSvar)),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    expect(screen.getByText("Noe gikk galt.")).toBeInTheDocument();
  });

  test("Viser 'venter på vert' dersom vi ikke har spørsmål, men loading", () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      mutate: jest.fn(() => Promise.resolve(testSpørsmålOgSvar)),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: testSpørreundersøkelseId,
          sporsmalId: testSpørsmålId,
          temaId: testTemaId,
        }}
      />,
    );

    expect(screen.getByText("Venter på vert")).toBeInTheDocument();
  });
});
