import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Spørsmålsside from "./page";
import { axe, toHaveNoViolations } from "jest-axe";

import {
  dummySpørreundersøkelseId,
  dummyFørsteSpørsmål,
  dummyAndreSpørsmål,
  dummyTredjeSpørsmål,
  dummyFjerdeSpørsmål,
  førsteTemaFørsteSpørsmål,
  dummyFlervalgSpørsmålMedMangeSvaralternativer,
  // @ts-ignore
} from "@/utils/dummyData/dummyInnholdForSpørreundersøkelse";
import {
  dummyTemaoversikt,
  // @ts-ignore
} from "@/utils/dummyData/vert";
// @ts-ignore
import { dummyVertId } from "@/utils/dummyData/vert";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/vert/useSpørsmålOgSvar";
const dummySpørsmålId: string = førsteTemaFørsteSpørsmål.spørsmålId;
const testTema = førsteTemaFørsteSpørsmål.temaId;
const testSpørsmålOgSvar: SpørsmåloversiktDTO = dummyFørsteSpørsmål;
const testAntallSvar = "3";
const testAntallDeltakere = "4";

expect.extend(toHaveNoViolations);

const pushMock = jest.fn(() => null);
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    prefetch: () => null,
    push: pushMock,
  })),
  usePathname: jest.fn(() => "/"),
}));

jest.mock("@/app/_api_hooks/vert/useAntallDeltakere", () => ({
  useAntallDeltakere: () => ({
    data: testAntallDeltakere,
    isLoading: false,
    error: undefined,
  }),
}));

jest.mock("@/app/_api_hooks/vert/useAntallSvar", () => ({
  useAntallSvar: () => ({
    data: testAntallSvar,
    isLoading: false,
    error: undefined,
  }),
}));

jest.mock("@/app/_api_hooks/vert/useSpørsmålOgSvar", () => ({
  useSpørsmålOgSvar: jest.fn(),
}));

jest.mock("@/app/_api_hooks/vert/useTemaoversikt", () => ({
  useTemaoversikt: () => ({
    data: dummyTemaoversikt,
    isLoading: false,
    error: undefined,
  }),
}));

describe("vert/spørsmålside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: testSpørsmålOgSvar,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
  });

  test("rett innhold blir tegnet opp", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );
    const tittel = await screen.findByText(testSpørsmålOgSvar.spørsmålTekst);

    expect(tittel).toBeInTheDocument();

    expect(
      screen.getByText(`${testAntallSvar} av ${testAntallDeltakere}`),
    ).toBeInTheDocument();

    for (const svaralternativ of testSpørsmålOgSvar.svaralternativer) {
      const svar = await screen.findByText(svaralternativ.svartekst);
      expect(svar).toBeInTheDocument();
    }
  });

  test("vert blir routet til rett spørsmålside ved trykk på neste", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const nesteKnapp = screen.getByText("Neste");
    expect(nesteKnapp).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledTimes(0);
    act(() => nesteKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(
      `../${testSpørsmålOgSvar.nesteSpørsmål?.temaId}/${testSpørsmålOgSvar.nesteSpørsmål?.spørsmålId}`,
    );
  });

  test("vert blir routet til temaside ved tilbaketrykk på første spørsmål", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyFørsteSpørsmål,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const tilbakeKnapp = screen.getByText("Tilbake til temaside");
    expect(tilbakeKnapp).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledTimes(0);
    act(() => tilbakeKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(".");
  });

  test("vert blir routet til temaside ved tilbaketrykk på første spørsmål i andre tema", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyFjerdeSpørsmål,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const tilbakeKnapp = screen.getByText("Tilbake til temaside");
    expect(tilbakeKnapp).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledTimes(0);
    act(() => tilbakeKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(".");
  });

  test("vert blir routet til første spørsmål ved tilbaketrykk på andre spørsmål", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyAndreSpørsmål,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const tilbakeKnapp = screen.getByText("Forrige spørsmål");
    expect(tilbakeKnapp).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledTimes(0);
    act(() => tilbakeKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(
      `../${dummyAndreSpørsmål.forrigeSpørsmål.temaId}/${dummyAndreSpørsmål.forrigeSpørsmål.spørsmålId}`,
    );
  });

  test("vert blir routet til oversikt om neste IdentifiserbartSpørsmål er null", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyTredjeSpørsmål,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const oversiktKnapp = screen.getByText("Oversikt");
    expect(oversiktKnapp).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledTimes(0);
    act(() => oversiktKnapp.click());
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("../../oversikt");
  });

  test("Viser checkbokser for flervalgsspørsmål", async () => {
    jest.mocked(useSpørsmålOgSvar).mockReturnValue({
      data: dummyFlervalgSpørsmålMedMangeSvaralternativer,
      isLoading: false,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
    });

    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const checkbokser = screen.queryAllByRole("checkbox");

    expect(checkbokser.length).toBe(
      dummyFlervalgSpørsmålMedMangeSvaralternativer.svaralternativer.length,
    );

    const radiobuttons = screen.queryAllByRole("radio");
    expect(radiobuttons.length).toBe(0);
  });

  test("Viser radio buttons for vanlige spørsmål", async () => {
    render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const checkbokser = screen.queryAllByRole("checkbox");

    expect(checkbokser.length).toBe(0);

    const radiobuttons = screen.queryAllByRole("radio");
    expect(radiobuttons.length).toBe(
      testSpørsmålOgSvar.svaralternativer.length,
    );
  });

  test("axe UU-test", async () => {
    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });

  test("axe UU-test for alle spørsmål", async () => {
    const { container } = render(
      <Spørsmålsside
        params={{
          uuid: dummySpørreundersøkelseId,
          vertId: dummyVertId,
          temaId: testTema,
          sporsmalId: dummySpørsmålId,
        }}
      />,
    );

    const førsteTittel = await screen.findByText(
      testSpørsmålOgSvar.spørsmålTekst,
    );
    expect(førsteTittel).toBeInTheDocument();

    const skalVæreOversikt =
      testSpørsmålOgSvar.nesteSpørsmål === null ||
      testSpørsmålOgSvar.nesteSpørsmål.temaId !== testTema;

    const nesteKnapp = screen.getByText(
      skalVæreOversikt ? "Oversikt" : "Neste",
    );

    expect(nesteKnapp).toBeInTheDocument();

    act(() => {
      nesteKnapp.click();
    });

    const results = await axe(container, {
      rules: {
        "svg-img-alt": { enabled: false }, // TODO: Fiks alt-tekst på svg (qr-kode) før denne testen kan slås på.
      },
    });
    expect(results).toHaveNoViolations();
  });
});
